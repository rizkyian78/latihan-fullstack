import React from 'react'
import { Input, Button, message, Upload, Image } from 'antd'
import axios from 'axios'
import io from 'socket.io-client'
import { Formik } from 'formik'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'antd/dist/antd.css'

export default function Test(props) {
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    context: '',
    file: '',
  })
  const [showMessage, setShowMessage] = React.useState('')
  const [lastMessage, setLastMessage] = React.useState('')

  React.useEffect(() => {
    axios.get(`http://localhost:8090/v1/chat`).then((res) => {
      setShowMessage(res.data.data)
      setInitialValues(res.data.data)
    })
  }, [axios, lastMessage])

  React.useEffect(() => {
    const socket = io('http://localhost:8090/', {
      secure: true,
      transports: ['websocket'],
      path: '/socket', // added this line of code
    })
    socket.on('message', (data) => {
      console.log(data)
      setLastMessage(data)
    })
    return () => {
      socket.removeListener('message')
    }
  })

  const handleAdd = (data) => {
    delete data.id
    axios.post(`http://localhost:8090/v1/chat`, data).catch((err) => {
      message.error('tidak bisah')
    })
  }
  console.log(showMessage)
  return (
    <>
      {showMessage &&
        showMessage.map((x) => {
          return (
            <div>
              {x.body},{' '}
              {moment(x.createdAt).locale('en').startOf('second').fromNow()}
            </div>
          )
        })}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          handleAdd(values)
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <>
              <Input
                name="context"
                onChange={handleChange}
                value={values.context}
              />
              <Upload
                accept="image/png, image/jpeg"
                {...props}
                name="file"
                onChange={(e) => {
                  setFieldValue('file', e.file)
                }}
                className="mt-2"
                style={{ borderRadius: 10 }}
                maxCount={1}
                type="select"
              >
                <Button
                  style={{ borderRadius: 20 }}
                  className="mt-3"
                  icon={<UploadOutlined />}
                >
                  Click to Upload Image
                </Button>
              </Upload>
              <Button onClick={handleSubmit}>Oke</Button>
            </>
          )
        }}
      </Formik>
    </>
  )
}
