import React from 'react'
import { FormField, Input, Label, Select } from '..'
import { Email as EmailIcon } from 'pcln-icons'

afterEach(() => {
  // bust cache for propTypes
  FormField.displayName = 'FormField' + Math.random()
})

describe('FormField', () => {
  test('renders', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label>Email Address</Label>
        <Input id='email' name='email' />
      </FormField>
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with Icon', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label>Email Address</Label>
        <EmailIcon />
        <Input id='email' name='email' />
      </FormField>
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with Select ', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label>Pick Option</Label>
        <Select />
      </FormField>
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with Select and Icon', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label>Pick Email Address</Label>
        <EmailIcon />
        <Select />
      </FormField>
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with Label autoHide prop', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label autoHide>Email</Label>
        <EmailIcon />
        <Input id='email' name='email' />
      </FormField>
    ).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('shows Label with autoHide prop and field value', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label autoHide>Email</Label>
        <EmailIcon />
        <Input id='email' name='email' value='hello@example.com' />
      </FormField>
    ).toJSON()
    const [label] = json.children
    expect(label.props.style.opacity).toBe(1)
  })

  test('adds htmlFor prop to Label', () => {
    const json = rendererCreateWithTheme(
      <FormField>
        <Label />
        <Input id='hello' name='hello' />
      </FormField>
    ).toJSON()
    const [label] = json.children
    expect(label.props.htmlFor).toBe('hello')
  })
})
