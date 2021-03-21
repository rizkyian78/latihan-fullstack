import React, { Component } from 'react'
import NavbarAdmin from 'parts/NavbarAdmin'
import SideBar from 'parts/Sidebar'
import DetailBooking from 'parts/DetailBooking'

export default class Category extends Component {
  render() {
    return (
      <>
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <div className="col">
              <DetailBooking />
            </div>
          </div>
        </div>
      </>
    )
  }
}
