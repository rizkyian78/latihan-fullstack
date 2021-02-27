import React from 'react'
import { Table, Button, Col, Modal, Typography, Card, Row, Input } from 'antd'
import SearchBar from './SearchBar'

import 'antd/dist/antd.css'

export default function CategoryTable() {
  const [isModalShow, setIsModalShow] = React.useState(false)
  const columns = [
    {
      title: 'No',
      dataIndex: 'nomor',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Date',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Title',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name Member',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Name Bank',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'name',
    },
  ]
  function onChange(pagination, filters, sorter, extra) {
    console.log(pagination, filters, sorter, extra)
    console.log('params', pagination, filters, sorter, extra)
  }
  function onChange(pagination, filters, sorter, extra) {
    console.log(pagination, filters, sorter, extra)
    console.log('params', pagination, filters, sorter, extra)
  }
  const showModal = () => {
    setIsModalShow(true)
  }
  const handleOk = (e) => {
    setIsModalShow(false)
  }
  const handleCancel = (e) => {
    setIsModalShow(false)
  }
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Booking</Typography.Title>
        <Row justify="space-between" gutter={[16, 8]}>
          <Col>
            <Button type="primary" onClick={showModal}>
              + Add
            </Button>
            <Modal
              title="Basic Modal"
              visible={isModalShow}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Typography.Text>Title</Typography.Text>
              <Input placeholder="Input Title" />
              <Typography.Text>Price</Typography.Text>
              <Input placeholder="Input Title" />
              <Typography.Text>Country</Typography.Text>
              <Input placeholder="Input Title" />
              <Typography.Text>City</Typography.Text>
              <Input placeholder="Input Title" />
            </Modal>
          </Col>
          <SearchBar />
        </Row>
        <Table columns={columns} onChange={onChange} />
      </Card>
    </>
  )
}
