import React from 'react'
import { ToggleBadge, theme } from '../src'

describe('ToggleBadge', () => {
  test('selected ToggleBadge renders with default props', () => {
    const json = rendererCreateWithTheme(<ToggleBadge selected />).toJSON()
    expect(json).toMatchSnapshot()
    expect(json).toHaveStyleRule('background-color', theme.colors.lightBlue)
    expect(json).toHaveStyleRule('color', theme.colors.blue)
  })

  test('unselected ToggleBadge renders with default props', () => {
    const json = rendererCreateWithTheme(<ToggleBadge />).toJSON()
    expect(json).toMatchSnapshot()
    expect(json).toHaveStyleRule('color', theme.colors.blue)
  })

  test('selected one with background-color and text color passed as props hover state', () => {
    const json = rendererCreateWithTheme(
      <ToggleBadge selected bg="green" color="red" fontSize={1} />
    ).toJSON()
    expect(json).toMatchSnapshot()
    expect(json).toHaveStyleRule('background-color', theme.colors.lightGreen)
    expect(json).toHaveStyleRule('color', theme.colors.red)
  })
})
