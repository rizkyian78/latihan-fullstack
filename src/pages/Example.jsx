import React from 'react'
import BreadCrumbs from 'elements/Form/BreadCrumbs/index'

export default class Example extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  }

  handleChange = (e) => {
    console.log(e.target)
    this.setState({ value: e.target.value })
  }
  render() {
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
    return (
      <div className="container">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <div className="col-auto">
            <BreadCrumbs data={breadCrumbList} />
          </div>
        </div>
      </div>
    )
  }
}
