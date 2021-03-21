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

  // React.useEffect(() => {
  //   axios.get(`http://localhost:8010/v1/chat`).then((res) => {
  //     setShowMessage(res.data.data)
  //   })
  // }, [axios, lastMessage])

  // React.useEffect(() => {
  //   const socket = io('http://localhost:8010/', {
  //     secure: true,
  //     transports: ['websocket'],
  //     auth: {
  //       token: '',
  //     },
  //     path: '/socket', // added this line of code
  //   })
  //   socket.on('message', (data) => {
  //     setLastMessage(data)
  //   })
  //   return () => {
  //     socket.removeListener('message')
  //   }
  // })

  const handleAdd = (data) => {
    delete data.id
    axios.post(`http://localhost:8010/v1/chat`, data).catch((err) => {
      message.error(err.response.data.message)
    })
  }
  return (
    <>
      {showMessage &&
        showMessage.map((x) => {
          console.log(x)
          return (
            <div>
              {x.context},{' '}
              {moment(x.waktu).locale('en').startOf('second').fromNow()}
              <Image
                key={x._id}
                height={50}
                width={50}
                src={`http://localhost:8010/${x.fileUser}`}
              />
            </div>
          )
        })}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          const formData = new FormData()
          for (const [key, value] of Object.entries(values)) {
            if (key === 'file') {
              formData.append('file', value.originFileObj)
            }
            formData.append(key, value)
          }
          handleAdd(formData)
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
