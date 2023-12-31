import type { StoryObj } from '@storybook/react'

import { Check, ChevronDown, ChevronUp, Copy } from 'pcln-icons'
import React, { useEffect, useRef, useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import * as Pcln from '../..'
import { copy, formatCode, getStoryCode } from '../utils'

export type LiveDemoProps = {
  code: string | StoryObj
}

const scope = {
  ...Pcln,
  useEffect,
  useRef,
  useState,
}

const theme = {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#011627',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic' as 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic' as 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic' as 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(99, 119, 119)',
        fontStyle: 'italic' as 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'rgb(130, 170, 255)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic' as 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(127, 219, 202)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)',
        fontStyle: 'normal' as 'normal',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
        fontStyle: 'normal' as 'normal',
      },
    },
  ],
}

export const LiveDemo = ({ code }: LiveDemoProps) => {
  const defaultCode = typeof code === 'string' ? formatCode(code) : getStoryCode(code)
  const [editorCode, setEditorCode] = useState(defaultCode)
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout>()
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const ShowCodeIcon = showCode ? ChevronUp : ChevronDown

  const handleCopy = async () => {
    await copy(editorCode)
    clearTimeout(copyTimeout)
    setCopyTimeout(setTimeout(() => setCopied(false), 1000))
    setCopied(true)
  }

  return (
    <Pcln.Box my={3} borderRadius='xl' style={{ border: '1px solid #0002' }}>
      <LiveProvider code={editorCode} scope={scope} theme={theme}>
        <Pcln.Relative>
          <Pcln.Relative p={4}>
            <LivePreview />
          </Pcln.Relative>
          <Pcln.Absolute display='flex' right={1} bottom={1}>
            <Pcln.Button
              variation='link'
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
              <ShowCodeIcon />
            </Pcln.Button>
          </Pcln.Absolute>
        </Pcln.Relative>
        {showCode && (
          <Pcln.Animate variant='expandDown'>
            <Pcln.Relative rounded='bottom' bg='background.darkest' p={3} borderRadius='xl'>
              <LiveEditor onChange={(newCode) => setEditorCode(newCode.trim())} />
              <Pcln.Absolute right={3} bottom={3}>
                {!copied && <Pcln.IconButton icon={<Copy color='text.light' />} onClick={handleCopy} />}
                {copied && <Check color='secondary' />}
              </Pcln.Absolute>
            </Pcln.Relative>
          </Pcln.Animate>
        )}
        <LiveError />
      </LiveProvider>
    </Pcln.Box>
  )
}
