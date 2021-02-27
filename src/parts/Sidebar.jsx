import React from 'react'
import { IconButton, Sidenav, Nav, Icon, Dropdown } from 'rsuite'
import { withRouter } from 'react-router-dom'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      expanded: true,
      activeKey: '',
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.close = this.close.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }
  toggleDrawer(placement) {
    this.setState({
      placement,
      show: true,
    })
  }
  close() {
    this.setState({
      show: false,
    })
  }
  handleToggle() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }
  handleSelect(eventKey) {
    this.props.history.push(`/admin/${eventKey}`)
    this.setState({
      activeKey: eventKey,
    })
  }
  componentDidMount() {
    const eventName = this.props.location.pathname.split('/').pop()
    this.setState({
      activeKey: eventName,
    })
  }
  render() {
    const { expanded } = this.state
    return (
      <div style={{ width: 250 }}>
        <IconButton
          onClick={this.handleToggle}
          checked={expanded}
          style={{ width: 250 }}
        >
          Menu
        </IconButton>
        <Sidenav
          expanded={expanded}
          defaultOpenKeys={['3', '4']}
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
          onOpenChange={() =>
            // this.props.history.push(`/admin/${this.state.activeKey}`)
            console.log('open change')
          }
        >
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="dashboard" icon={<Icon icon="dashboard" />}>
                Dashboard
              </Nav.Item>
              <Dropdown
                placement="rightStart"
                eventKey="3"
                title="Master"
                icon={<Icon icon="magic" />}
              >
                <Dropdown.Item eventKey="category">Category</Dropdown.Item>
                <Dropdown.Item eventKey="bank">Bank</Dropdown.Item>
                <Dropdown.Item eventKey="item">Item</Dropdown.Item>
                <Dropdown.Item eventKey="feature">
                  Feature Activity
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                placement="rightStart"
                eventKey="4"
                title="Order"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item eventKey="booking">Booking</Dropdown.Item>
                <Dropdown.Item eventKey="statistic">Statistic</Dropdown.Item>
                <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    )
  }
}

export default withRouter(Demo)
