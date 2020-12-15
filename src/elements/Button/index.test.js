import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Button from './index'

test('Should not allowed click if isDisabled is exist', () => {
  const { container } = render(<Button isDisabled></Button>)
  expect(container.querySelector('span.disabled')).toBeInTheDocument()
})

test('Should not allowed click if isLoading is exist', () => {
  const { container, getByText } = render(<Button isLoading></Button>)
  expect(getByText(/loading/i)).toBeInTheDocument()
  expect(container.querySelector('span')).toBeInTheDocument()
})

test('Should render a tag <a>', () => {
  const { container } = render(<Button type="link" isExternal></Button>)
  expect(container.querySelector('a')).toBeInTheDocument()
})

test('Should render a Component <Link>', () => {
  const { container } = render(
    <Router>
      <Button href="" type="link" isExternal></Button>
    </Router>,
  )
  expect(container.querySelector('a')).toBeInTheDocument()
})
