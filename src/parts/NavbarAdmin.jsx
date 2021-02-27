import Header from 'parts/Header'
import React, { Component } from 'react'
import { Navbar, Nav, Icon } from 'rsuite'
import { Badge } from 'antd'

import 'rsuite/dist/styles/rsuite-default.css'
import 'antd/dist/antd.css'

export default class Admin extends Component {
  render() {
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
              <Nav.Item className>Sulton Amin</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </>
    )
  }
}
