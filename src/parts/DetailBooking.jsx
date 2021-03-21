import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { capitalize } from 'lodash'
import { changedColorStatus } from 'Options/statusChanged'
import {
  Row,
  Col,
  Divider,
  Card,
  Image,
  Typography,
  Space,
  Button,
  notification,
  message,
} from 'antd'
import Icon, {
  WifiOutlined,
  CarOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Formik } from 'formik'
import moment from 'moment'
import { numberFormat } from 'helper/Common'
import io from 'socket.io-client'

// https://d1785e74lyxkqq.cloudfront.net/webacd-desktop/_next/static/6a33c3a06072cf3a77c3cea1d65d524b.svg

import 'antd/dist/antd.css'

export default withRouter(function DetailBooking(props) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [updateStatus, setIsUpdateStatus] = React.useState('')
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    itemId: {
      _id: '',
      price: '',
      duration: 0,
    },
    payment: {
      proofPayment: '',
      bankFrom: '',
      accountHolder: '',
      status: '',
    },
    bookingStartDate: '',
    bookingEndDate: '',
    night: 0,
    invoice: '',
    total: 0,
    memberId: '',
    bankId: '',
  })
  const HotelImage = () => (
    <Image
      preview={false}
      src="https://d1785e74lyxkqq.cloudfront.net/webacd-desktop/_next/static/6a33c3a06072cf3a77c3cea1d65d524b.svg
  "
    />
  )
  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get(`http://localhost:8090/v1/booking/${props.match.params.id}`)
      .then((res) => {
        setIsLoading(false)
        setData(res.data.data)
        setInitialValues(res.data.data)
        setIsUpdateStatus(res.data.data.payment.status)
      })
      .catch((err) => console.log(err))
  }, [axios, updateStatus])
  React.useEffect(() => {
    const socket = io('http://localhost:8090/', {
      secure: true,
      transports: ['websocket'],
      auth: {
        token: '',
      },
      path: '/socket', // added this line of code
    })
    socket.on('status', (data) => {
      setIsUpdateStatus(data)
    })
    return () => {
      socket.removeListener('status')
    }
  })
  const HotelIcon = (props) => (
    <Icon disabled component={HotelImage} {...props} />
  )
  const handleStatusRejectOrApproved = (data) => {
    axios
      .put(`http://localhost:8090/v1/booking/${data._id}`, data)
      .then((res) => {
        notification.success({
          message: 'Status Berhasil diubah',
          duration: 2.5,
        })
      })
      .catch((err) => message.error('Harap Masukkan nama'))
  }
  return (
    <Card className="mt-3" style={{ borderRadius: 10 }}>
      <Row justify="space-between">
        <Typography.Title level={3}>Detail Booking</Typography.Title>
        <Button
          type="primary"
          ghost
          icon={<SendOutlined style={{ fontSize: 18 }} />}
          style={{ fontWeight: 'bolder', borderRadius: 10 }}
        >
          Send
        </Button>
      </Row>
      <Row justify="space-between">
        <Col span={10}>
          <Card style={{ borderRadius: 10 }}>
            <Row justify="space-between">
              <Typography.Text style={{ fontWeight: 500 }}>
                Booking Invoice
              </Typography.Text>
              <Typography.Text
                style={{
                  fontWeight: 500,
                  color: changedColorStatus[updateStatus],
                }}
              >
                {data && data.payment ? data.payment.status : updateStatus}
              </Typography.Text>
            </Row>
            <Typography style={{ fontWeight: 900, fontSize: 16 }}>
              {data && data.invoice ? data.invoice : null}
            </Typography>
            <Divider></Divider>
            <Space>
              <HotelIcon />
              <Typography.Title level={4}>
                {data && data.itemId ? capitalize(data.itemId._id.title) : null}
              </Typography.Title>
            </Space>
            <Typography>
              {data && data.payment ? (
                <p style={{ color: 'rgb(1, 148, 243)', fontWeight: 500 }}>
                  Pay with Transfer
                </p>
              ) : (
                <p style={{ color: 'rgb(1, 148, 243)' }}>Pay Upon Check In</p>
              )}
            </Typography>
            <div className="icons-list" style={{ color: 'rgb(11, 193, 117)' }}>
              <Space>
                <WifiOutlined style={{ fontSize: 20 }} />
                Free Wifi
              </Space>
            </div>
            <br />
            <Space>
              <img src="https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/icon-kit-web/svg/greenPrimary/ic_policy_check_16px-f6f9717a612a9fad9785477deb686e9a.svg"></img>
              <p style={{ color: 'rgb(11, 193, 117)' }}>
                Cancellation policy applies
              </p>
            </Space>
            <br />
            <br />
            <Space>
              <CarOutlined
                style={{ fontSize: 20, color: 'rgb(11, 193, 117)' }}
              />
              <p style={{ color: 'rgb(11, 193, 117)' }}>Parking lot</p>
            </Space>
            <Divider dashed></Divider>
            <Row justify="space-between">
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                Duration of Stay
              </Typography>
              {data && data.itemId ? (
                <Typography>{data.itemId.duration} night</Typography>
              ) : null}
            </Row>
            <Row justify="space-between">
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                Check In
              </Typography>
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                {data && data.bookingStartDate ? (
                  <Typography>
                    {moment(data.bookingStartDate).locale('en').format('dddd')},{' '}
                    {moment(data.bookingStartDate).locale('id').format('ll')}
                  </Typography>
                ) : null}
              </Typography>
            </Row>
            <Row justify="space-between">
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                Check Out
              </Typography>
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                {data && data.bookingEndDate ? (
                  <Typography>
                    {moment(data.bookingEndDate).locale('en').format('dddd')},{' '}
                    {moment(data.bookingEndDate).locale('id').format('ll')}
                  </Typography>
                ) : null}
              </Typography>
            </Row>
            <Row justify="space-between">
              <Typography style={{ color: 'rgb(104, 113, 118)' }}>
                Total Guest
              </Typography>
              <Typography>2 Guest</Typography>
            </Row>
            <Divider dashed></Divider>
            <Typography.Title level={5}>Price Detail</Typography.Title>
            <Row justify="space-between">
              <Typography>
                (1x) {data && data.itemId ? data.itemId._id.title : null} (
                {data && data.night ? data.night : null} night)
              </Typography>
              <Typography>
                IDR{' '}
                {data && data.itemId
                  ? numberFormat(data.itemId.price * data.itemId.duration)
                  : null}{' '}
              </Typography>
            </Row>
            <Divider dashed></Divider>
            <Typography style={{ color: 'rgb(104, 113, 118)' }}>
              Guest Name
            </Typography>
            {data && data.memberId ? (
              <Typography>
                {data.memberId.firstName} {data.memberId.lastName}{' '}
              </Typography>
            ) : null}
          </Card>
          <Row justify="space-between" className="mt-3">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                handleStatusRejectOrApproved(values)
              }}
            >
              {({ handleSubmit, setFieldValue }) => {
                return (
                  <>
                    <Button
                      style={{
                        color: 'green',
                        borderRadius: 20,
                        fontWeight: 'bold',
                      }}
                      onClick={(e) => {
                        setFieldValue('payment.status', 'Approved')
                        handleSubmit(e.target.value)
                      }}
                    >
                      Approved
                    </Button>
                    <Button
                      style={{
                        color: 'red',
                        borderRadius: 20,
                        fontWeight: 'bold',
                      }}
                      name="payment.status"
                      onClick={(e) => {
                        setFieldValue('payment.status', 'Rejected')
                        handleSubmit(e.target.value)
                      }}
                    >
                      Rejected
                    </Button>
                  </>
                )
              }}
            </Formik>
          </Row>
        </Col>
        <Col span={10}>
          <Card style={{ borderRadius: 10 }}>
            <Image
              src={`http://localhost:8090/${
                data && data.payment ? data.payment.proofPayment : null
              }`}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  )
})
