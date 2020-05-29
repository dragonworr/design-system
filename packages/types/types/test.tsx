import {
  Absolute,
  BackgroundImage,
  BlockLink,
  borders,
  Box,
  Card,
  color,
  createTheme,
  deprecatedPropType,
  Flex,
  getContrastRatio,
  getPaletteColor,
  getTextColorOn,
  hasPaletteColor,
  Heading,
  Hide,
  Image,
  Link,
  PlaceholderImage,
  SrOnly,
  Text,
  theme as ThemeType,
  ThemeProvider,
  Truncate,
} from 'pcln-types'
import theme from '../../core/src/theme'
import * as React from 'react'

//
// Design System Utility Functions
// =============================================================================================

getContrastRatio('a', 'b') // $ExpectType number

deprecatedPropType('myProp') // $ExpectType Error | undefined

// $ExpectType object
borders({
  theme,
})

hasPaletteColor({ theme }) // $ExpectType boolean

color({ theme, bg: 'primary', color: 'secondary' }) // $ExpectType string | string[]

getPaletteColor('primary', 'light') // $ExpectType (props: ThemeArgs) => any

getTextColorOn('bla') // $ExpectType (props: ThemeArgs) => any

createTheme(theme, {}) // $ExpectType CreateThemeResult

const myTheme: ThemeType = theme

//
// Design System Core Components
// =============================================================================================

// $ExpectType Element
const myThemeProvider = (
  <ThemeProvider theme={theme} customBreakpoints={['100px', '500px']} />
)

const myBox = <Box width={'1'} bg={'primary'} /> // $ExpectType Element
const myCard = <Card width={'1'} bg={'primary'} borderRadius={'md'} /> // $ExpectType Element
const myText = <Text regular /> // $ExpectType Element
const mySpan = <Text.span regular /> // $ExpectType Element
const myAbsolute = <Absolute bottom={1} top={1} left={1} right={1} /> // $ExpectType Element
const myFlex = <Flex flexDirection={['row', null, 'column']} m={3} /> // $ExpectType Element
const myHide = <Hide xs sm md lg xl xxl m={3} /> // $ExpectType Element
// $ExpectType Element
const myLink = (
  <Link color={'secondary'} variation={'outline'} dsRef={{ current: 'bla' }} />
)
// $ExpectType Element
const myBlockLink = (
  <BlockLink
    color={'secondary'}
    variation={'outline'}
    dsRef={() => 'ima ref'}
  />
)

const myHeading = <Heading color={'secondary'} /> // $ExpectType Element
const myH1 = <Heading.h1 caps /> // $ExpectType Element
const myH2 = <Heading.h2 fontSize={'300px'} /> // $ExpectType Element
const myH3 = <Heading.h3 m={4} /> // $ExpectType Element
const myH4 = <Heading.h4 p={[2, 2, 4]} /> // $ExpectType Element
const myH5 = <Heading.h5 lineHeight={'12px'} /> // $ExpectType Element
const myH6 = <Heading.h6 /> // $ExpectType Element

const myTruncate = <Truncate color={'primary'} /> // $ExpectType Element
const mySrOnly = <SrOnly class='test-class-stuff' /> // $ExpectType Element
// $ExpectType Element
const myImage = (
  <Image height={'50px'} width={[1, 1 / 2]} alt={'image'} src={'cat.jpg'} />
)
// $ExpectType Element
const myBackgroundImage = (
  <BackgroundImage
    height={'50px'}
    width={[1, 1 / 2]}
    variation={'static'}
    image={'cat.jpg'}
  />
)
// $ExpectType Element
const myPlaceholderImage = (
  <PlaceholderImage
    alt={'Alt text'}
    height={'50px'}
    width={'25px'}
    chooseSrc={'1'}
    ariaHidden={false}
    blur
  />
)
