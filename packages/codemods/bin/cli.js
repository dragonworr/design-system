/**
 * Copyright 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// react-codemod optional-name-of-transform optional/path/to/src [...options]

const globby = require('globby')
const inquirer = require('inquirer')
const meow = require('meow')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const isGitClean = require('is-git-clean')

const transformerDirectory = path.join(__dirname, '../', 'transforms')
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift')

function checkGitStatus(force) {
  let clean = false
  let errorMessage = 'Unable to determine if git directory is clean'
  try {
    clean = isGitClean.sync(process.cwd())
    errorMessage = 'Git directory is not clean'
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`)
    } else {
      console.log('Thank you for using react-codemods!')
      console.log(chalk.yellow('\nBut before we continue, please stash or commit your git changes.'))
      console.log('\nYou may use the --force flag to override this safety check.')
      process.exit(1)
    }
  }
}

function runTransform({ files, flags, parser, transformer, answers }) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`)

  let args = []

  const { dry, print, explicitRequire } = flags

  if (dry) {
    args.push('--dry')
  }
  if (print) {
    args.push('--print')
  }

  if (explicitRequire === 'false') {
    args.push('--explicit-require=false')
  }

  args.push('--verbose=2')

  args.push('--ignore-pattern=**/node_modules/**')

  args.push('--parser', parser)

  if (parser === 'tsx') {
    args.push('--extensions=tsx,ts,jsx,js')
  } else {
    args.push('--extensions=jsx,js')
  }

  args = args.concat(['--transform', transformerPath])

  if (transformer === 'class') {
    args.push('--flow=' + answers.classFlow)
    args.push('--remove-runtime-props=' + answers.classRemoveRuntimePropTypes)
    args.push('--pure-component=' + answers.classPureComponent)
    args.push('--mixin-module-name=' + answers.classMixinModuleName)
  }
  if (transformer === 'pure-render-mixin') {
    args.push('--mixin-name=' + answers.pureRenderMixinMixinName)
  }
  if (transformer === 'pure-component') {
    if (answers.pureComponentUseArrows) {
      args.push('--useArrows=true')
    }
    if (answers.pureComponentDestructuring) {
      args.push('--destructuring=true')
    }
  }

  // eslint-disable-next-line sonarjs/no-collapsible-if
  if (transformer === 'update-react-imports') {
    if (answers.destructureNamespaceImports) {
      args.push('--destructureNamespaceImports=true')
    }
  }

  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift)
  }

  args = args.concat(files)

  console.log(`Executing command: jscodeshift ${args.join(' ')}`)

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
    stripEof: false,
  })

  if (result.error) {
    throw result.error
  }
}

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: "button-fullwidth-to-width: Replaces Button's fullWidth prop using width",
    value: 'button-fullwidth-to-width',
  },
  {
    name: 'rename-deprecated-props-flex: Renames deprecated props on Flex elements',
    value: 'rename-deprecated-props-flex',
  },
  {
    name: 'rename-deprecated-props-text: Renames deprecated props on Text elements',
    value: 'rename-deprecated-props-text',
  },
  {
    name:
      'stamp-variation-solid-to-fill: Replaces the deprecated "solid" variation on Stamp elements with "fill"',
    value: 'stamp-variation-solid-to-fill',
  },
]

const PARSER_INQUIRER_CHOICES = [
  {
    name: 'JavaScript',
    value: 'babel',
  },
  {
    name: 'JavaScript with Flow',
    value: 'flow',
  },
  {
    name: 'TypeScript',
    value: 'tsx',
  },
]

function expandFilePathsIfNeeded(filesBeforeExpansion) {
  const shouldExpandFiles = filesBeforeExpansion.some((file) => file.includes('*'))
  return shouldExpandFiles ? globby.sync(filesBeforeExpansion) : filesBeforeExpansion
}

function run() {
  const cli = meow(
    {
      description: 'Codemods for updating React APIs.',
      help: `
    Usage
      $ npx react-codemod <transform> <path> <...options>

        transform    One of the choices from https://github.com/reactjs/react-codemod
        path         Files or directory to transform. Can be a glob like src/**.test.js

    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
      --explicit-require Transform only if React is imported in the file (default: true)

      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    },
    {
      boolean: ['force', 'dry', 'print', 'explicit-require', 'help'],
      string: ['_'],
      alias: {
        h: 'help',
      },
    }
  )

  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force)
  }

  if (cli.input[0] && !TRANSFORMER_INQUIRER_CHOICES.find((x) => x.value === cli.input[0])) {
    console.error('Invalid transform choice, pick one of:')
    console.error(TRANSFORMER_INQUIRER_CHOICES.map((x) => '- ' + x.value).join('\n'))
    process.exit(1)
  }

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'files',
        message: 'On which files or directory should the codemods be applied?',
        when: !cli.input[1],
        default: '.',
        // validate: () =>
        filter: (files) => files.trim(),
      },
      {
        type: 'list',
        name: 'parser',
        message: 'Which dialect of JavaScript do you use?',
        default: 'babel',
        when: !cli.flags.parser,
        pageSize: PARSER_INQUIRER_CHOICES.length,
        choices: PARSER_INQUIRER_CHOICES,
      },
      {
        type: 'list',
        name: 'transformer',
        message: 'Which transform would you like to apply?',
        when: !cli.input[0],
        pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
        choices: TRANSFORMER_INQUIRER_CHOICES,
      },
      // if transformer === 'class'
      {
        type: 'confirm',
        name: 'buttonFullWidthToWidth',
        when: (answers) => {
          return (
            cli.input[0] === 'button-fullwidth-to-width' ||
            answers.transformer === 'button-fullwidth-to-width'
          )
        },
        message: 'Generate Flow annotations from propTypes?',
        default: true,
      },
    ])
    .then((answers) => {
      const { files, transformer, parser } = answers

      const filesBeforeExpansion = cli.input[1] || files
      const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion])

      const selectedTransformer = cli.input[0] || transformer
      const selectedParser = cli.flags.parser || parser

      if (!filesExpanded.length) {
        console.log(`No files found matching ${filesBeforeExpansion.join(' ')}`)
        return null
      }

      return runTransform({
        files: filesExpanded,
        flags: cli.flags,
        parser: selectedParser,
        transformer: selectedTransformer,
        answers: answers,
      })
    })
}

module.exports = {
  run: run,
  runTransform: runTransform,
  checkGitStatus: checkGitStatus,
  jscodeshiftExecutable: jscodeshiftExecutable,
  transformerDirectory: transformerDirectory,
}
