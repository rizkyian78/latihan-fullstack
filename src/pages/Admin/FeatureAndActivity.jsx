import React, { Component } from 'react'
import NavbarAdmin from 'parts/NavbarAdmin'
import SideBar from 'parts/Sidebar'
import FeatureAndActivityTable from 'parts/FeatureAndActivityTable'

export default class FeatureAndActivity extends Component {
  render() {
    return (
      <>
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <div className="col">
              <FeatureAndActivityTable />
            </div>
          </div>
        </div>
      </>
    )
  }
}
