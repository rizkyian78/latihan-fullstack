import React, { Component } from 'react'
import NavbarAdmin from 'parts/NavbarAdmin'
import SideBar from 'parts/Sidebar'
import ItemTable from 'parts/FeatureAndActivityTable'

export default class Category extends Component {
  render() {
    return (
      <>
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <div className="col">
              <ItemTable />
            </div>
          </div>
        </div>
      </>
    )
  }
}
