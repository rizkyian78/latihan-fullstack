import React, { Component } from 'react'
import NavbarAdmin from 'parts/NavbarAdmin'
import SideBar from 'parts/Sidebar'
import AdminDashboard from 'parts/Dashboard'

export default class FeatureAndActivity extends Component {
  render() {
    return (
      <>
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <div className="col">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </>
    )
  }
}
