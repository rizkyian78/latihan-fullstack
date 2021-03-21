import Header from 'parts/Header'
import { parseJwt } from 'helper/Common'
import React, { Component } from 'react'
import { Navbar, Nav, Icon } from 'rsuite'
import { Badge, Menu, Dropdown, Button } from 'antd'
import { withRouter } from 'react-router-dom'

import 'rsuite/dist/styles/rsuite-default.css'
import 'antd/dist/antd.css'

class Admin extends Component {
  render() {
    const payload = parseJwt(localStorage.getItem('Authorization'))
    return (
      <>
        <Navbar appearance="subtle" className="shadow">
          <Navbar.Header className="mb-2">
            <Header isCentered {...this.props} />
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Badge count={100} overflowCount={99} size="default">
                <a href="#" className="head-example" />
              </Badge>
              <Nav.Item icon={<Icon icon="bell" size="lg" />} active></Nav.Item>
              <Nav.Item>{payload.nama}</Nav.Item>
              <Nav.Item
                onSelect={(e) => {
                  localStorage.removeItem('Authorization')
                  console.log(this.props.history.push('/admin'))
                }}
              >
                Logout
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </>
    )
  }
}

export default withRouter(Admin)
