import React from 'react'
import { Table, Button, Col, Typography, Card, Row, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'
import { changedColorStatus } from 'Options/statusChanged'
import axios from 'axios'
import SearchBar from './SearchBar'
import moment from 'moment'

import 'antd/dist/antd.css'

function BookingTable(props) {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:8090/v1/booking').then((res) => {
      setData(res.data.data)
    })
  }, [axios])
  const columns = [
    {
      title: 'No',
      dataIndex: 'invoice',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Date',
      render: (value) => (
        <Typography>{`${moment(value.bookingStartDate)
          .locale('id')
          .format('ll')} s/d ${moment(value.bookingEndDate)
          .locale('id')
          .format('ll')}`}</Typography>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'itemId',
      render: (value) => <Typography>{value.title}</Typography>,
    },
    {
      title: 'Name Member',
      dataIndex: 'memberId',
      defaultSortOrder: 'descend',
      render: (value) => (
        <Typography>
          {value.firstName} {value.lastName}
        </Typography>
      ),
    },
    {
      title: 'Name Bank',
      dataIndex: 'payment',
      render: (value) => <Typography>{value.bankFrom}</Typography>,
    },
    {
      title: 'Invoice',
      render: (value) => <Typography>{value.invoice}</Typography>,
    },
    {
      title: 'Status',
      dataIndex: 'payment',
      render: (value) => (
        <Typography.Text style={{ color: changedColorStatus[value.status] }}>
          {value.status}
        </Typography.Text>
      ),
    },
    {
      title: 'Action',
      render: (value) => {
        return (
          <Row gutter={[6]} justify="space-around">
            <Col>
              <Tooltip placement="rightTop">
                <Button
                  style={{ borderRadius: 20 }}
                  onClick={() =>
                    console.log(
                      props.history.push(`/admin/booking/${value._id}`),
                    )
                  }
                >
                  View
                </Button>
              </Tooltip>
            </Col>
          </Row>
        )
      },
    },
  ]
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Booking</Typography.Title>
        <Row justify="space-between" gutter={[16, 8]}>
          <SearchBar />
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  )
}

export default withRouter(BookingTable)
