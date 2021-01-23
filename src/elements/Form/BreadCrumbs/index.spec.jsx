import React from 'react'
import { render } from '@testing-library/react'
import BreadCrumb from './index'
import { BrowserRouter as Router } from 'react-router-dom'

const setup = () => {
  const breadCrumbList = [
    {
      pageTitle: 'Home',
      pageHref: '',
    },
    {
      pageTitle: 'House Details',
      pageHref: '',
    },
  ]
  const { container } = render(
    <Router>
      <BreadCrumb data={breadCrumbList} />
    </Router>,
  )
  const breadcrumb = container.querySelector('.breadcrumb')
  return {
    breadcrumb,
  }
}

test('Should Have ol with Classname .breadcrumb and have text home & House Details', () => {
  const { breadcrumb } = setup()
  expect(breadcrumb).toBeInTheDocument()
  expect(breadcrumb).toHaveTextContent('Home')
  expect(breadcrumb).toHaveTextContent('House Details')
})
