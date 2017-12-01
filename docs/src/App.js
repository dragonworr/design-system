import React from 'react'
import { StaticRouter, BrowserRouter, Route, NavLink } from 'react-router-dom'
import {
  ThemeProvider,
  Flex,
  Box,
  Heading,
  Text,
  Link,
  Hide,
  Container,
  Button,
  Image,
  colors
} from 'pcln-design-system'
import Landing from './Landing'
import Color from './Color'
import Typography from './Typography'
import Iconography from './Iconography'
import Detail from './Detail'
import Markdown from './Markdown'
import ScrollTop from './ScrollTop'
import NavItem from './NavItem'
import StickyBar from './StickyBar'

const Router = typeof document !== 'undefined' ? BrowserRouter : StaticRouter

const views = {
  Color,
  Typography,
  Iconography
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }

    this.update = fn => this.setState(fn)
  }

  render() {
    const {
      sections = [],
      content = [],
      basename,
      pathname,
      pkg,
      styles
    } = this.props
    const { menuOpen } = this.state

    return [
      <meta charSet="utf-8" />,
      <title key="title">Priceline One Design System</title>,
      <meta name="viewport" content="width=device-width,initial-scale=1" />,
      // styled-components SSR only returns HTML tag strings or React elements,
      // which isn't ideal here
      <head
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />,
      <link
        key="webfont"
        rel="stylesheet"
        href="http://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto+Mono"
      />,
      <ThemeProvider key="main">
        <Router basename={basename} location={pathname}>
          <ScrollTop>
            <Flex
              wrap
              align="flex-start"
              color="text"
              style={{ minHeight: '100vh' }}
            >
              <StickyBar
                open={menuOpen}
                width={[1, 240]}
                px={3}
                pt={0}
                pb={5}
                color="white"
                bg="text"
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                <Flex
                  align="center"
                  px={2}
                  pt={4}
                  pb={3}
                  mb={3}
                  bg="text"
                  style={{
                    position: 'sticky',
                    top: '0',
                    borderBottomColor: 'rgba(255,255,255,0.2)',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid'
                  }}
                >
                  <NavLink
                    to="/"
                    style={{
                      display: 'block',
                      color: 'inherit',
                      textDecoration: 'none'
                    }}
                  >
                    <Image src="../logo.svg" />
                  </NavLink>
                  <Hide ml="auto" sm md lg xl>
                    <Button size="small" onClick={e => this.update(toggleMenu)}>
                      Menu
                    </Button>
                  </Hide>
                </Flex>
                <NavItem to="/" exact>
                  Getting Started
                </NavItem>
                {sections.filter(s => !!s).map(section => (
                  <Box key={section.name} onClick={e => this.update(closeMenu)}>
                    <Heading.h6 color="gray" p={2}>
                      {section.name}
                    </Heading.h6>
                    {section.pages.map(page => (
                      <NavItem
                        key={page.name}
                        to={'/' + page.name}
                        color="inherit"
                        children={page.title || page.name}
                      />
                    ))}
                  </Box>
                ))}
                <NavItem href="https://github.com/pricelinelabs/design-system">
                  GitHub
                </NavItem>
              </StickyBar>
              <Box
                width={[1, 'calc(100% - 320px)']}
                style={{
                  flex: '1 1 auto',
                  minHeight: '100vh'
                }}
              >
                <Route
                  exact
                  path="/"
                  render={() => <Landing {...this.props} />}
                />
                <Container maxWidth={868}>
                  {sections.map(section =>
                    section.pages.map((page, i) => (
                      <Route
                        key={page.name}
                        path={'/' + page.name}
                        render={() => {
                          const Component = views[page.name]
                          const pageContent =
                            content.find(c => c.name === page.name) || {}
                          return Component ? (
                            <Component
                              {...page}
                              pages={section.pages}
                              index={i}
                            />
                          ) : (
                            <Detail
                              {...page}
                              content={pageContent.content}
                              pages={section.pages}
                              index={i}
                            />
                          )
                        }}
                      />
                    ))
                  )}
                </Container>
              </Box>
            </Flex>
          </ScrollTop>
        </Router>
      </ThemeProvider>
    ]
  }
}

const pages = [
  {
    name: 'Foundations',
    pages: ['Color', 'Typography', 'Iconography']
  },
  {
    name: 'Components',
    // Component markdown docs can be added here
    pages: [
      'BackgroundImage',
      'Badge',
      'Banner',
      'Box',
      'Button',
      'Card',
      'Container',
      'Divider',
      'Flag',
      'Flex',
      'Heading',
      'Hide',
      'Hug',
      'Icon',
      'Input',
      'Image',
      'Link',
      'Text',
      'Truncate'
    ]
  },
  {
    name: 'Resources',
    pages: ['Layout', 'Contributing']
  }
]

const customPages = {
  Color: {
    name: 'Color',
    route: '/color'
  },
  Typography: {
    name: 'Typography',
    route: '/typography'
  },
  Iconography: {
    name: 'Iconography',
    route: '/iconography'
  }
}

const routes = pages.reduce((a, b) => [...a, b.pages.map(name => '/' + name)], [
  '/'
])

App.defaultProps = {
  routes
}

// To use a different static site generator, this can be handled in Node
App.getInitialProps = async props => {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')
  const { ServerStyleSheet } = require('styled-components')
  const pkg = require('../../package.json')

  const content = fs
    .readdirSync(path.join(__dirname, '..'))
    .filter(file => /\.md$/.test(file))
    .map(filename => {
      const name = path.basename(filename, '.md')
      const raw = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8')
      const { content, data } = matter(raw)

      return Object.assign({}, data, {
        filename,
        name,
        route: '/' + name,
        content
      })
    })

  const sections = pages.map(page => {
    return Object.assign({}, page, {
      pages: page.pages.map(key => {
        return customPages[key] || { name: key, route: '/' + key }
      })
    })
  })

  const sheet = new ServerStyleSheet()
  sheet.collectStyles(React.createElement(props.Component, props))
  const styles = sheet.getStyleTags()

  return {
    pkg,
    styles,
    content,
    sections
  }
}

const toggle = key => state => ({ [key]: !state[key] })
const toggleMenu = toggle('menuOpen')
const closeMenu = state => ({ menuOpen: false })

export default App
