import React from 'react'
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Modal,
  Input,
  message,
  Tooltip,
  Popconfirm,
  Image,
  Upload,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import SearchBar from './SearchBar'
import { Formik } from 'formik'
import axios from 'axios'

import 'antd/dist/antd.css'

export default function CategoryTable(props) {
  const [isModalShow, setIsModalShow] = React.useState(false)
  const [dataBank, setDataBank] = React.useState('')
  const [modalType, setModalType] = React.useState('')
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    nameBank: '',
    nomorRekening: '',
    name: '',
    image: '',
  })

  const columns = [
    {
      title: 'No',
      dataIndex: 'nomor',
      sorter: (a, b) => a.nomor - b.nomor,
      sortDirections: ['desc'],
    },
    {
      title: 'Nama Bank',
      dataIndex: 'nameBank',
      defaultSortOrder: 'desc',
    },
    {
      title: 'Nomor Rekening',
      dataIndex: 'nomorRekening',
      filterMultiple: false,
      sortDirections: ['desc', 'asc'],
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      render: (path) => (
        <Image width={200} height={100} src={`http://localhost:8090/${path}`} />
      ),
    },
    {
      title: 'Action',
      width: 200,
      render: (value) => {
        return (
          <Row gutter={[6]} justify="space-around">
            <Col>
              <Tooltip placement="rightTop">
                <Button
                  style={{ borderRadius: 20 }}
                  onClick={() => showModal(value)}
                >
                  Edit
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={() => handleDelete(value)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <Tooltip placement="rightTop">
                  <Button style={{ borderRadius: 20 }} danger>
                    Delete
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Col>
          </Row>
        )
      },
    },
  ]
  React.useEffect(() => {
    axios.get('http://localhost:8090/v1/bank').then((res) => {
      setDataBank(res.data.data)
    })
  }, [axios])
  function onChange(pagination, filters, sorter, extra) {
    console.log(pagination, filters, sorter, extra)
    console.log('params', pagination, filters, sorter, extra)
  }
  const handleAdd = (data) => {
    axios
      .post(`http://localhost:8090/v1/bank`, data)
      .then((res) => {
        message.success('Berhasil Menambah Data')
        axios.get('http://localhost:8090/v1/bank').then((res) => {
          setDataBank(res.data.data)
        })
      })
      .catch((err) => {
        message.error(err.response.data.message)
      })

    setIsModalShow(false)
  }
  function cancel(e) {
    console.log(e)
    message.error('Click on No')
  }
  const showModal = (value) => {
    setInitialValues(value)
    setIsModalShow(true)
    setModalType('edit')
  }
  function handleDelete(data) {
    axios.delete(`http://localhost:8090/v1/bank/${data._id}`).then((res) => {
      axios
        .get('http://localhost:8090/v1/bank')
        .then((res) => {
          setDataBank(res.data.data)
        })
        .catch((err) => message.error('Tidak Bisa Di Delete'))
    })
    message.success('Data berhasil Di Delete')
  }
  function handleEdit(id, data) {
    axios
      .put(`http://localhost:8090/v1/bank/${id}`, data)
      .then((res) => {
        axios
          .get('http://localhost:8090/v1/bank')
          .then((res) => {
            message.success('Data Berhasil Diubah')
            setDataBank(res.data.data)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => message.error(err.message))
    setIsModalShow(false)
  }
  const handleOk = (e) => {
    setIsModalShow(false)
  }
  const handleCancel = (e) => {
    setIsModalShow(false)
  }
  const data = []
  for (let i = 0; i < dataBank.length; i += 1) {
    data.push({
      _id: dataBank[i]._id,
      nomor: i + 1,
      nameBank: dataBank[i].nameBank,
      nomorRekening: dataBank[i].nomorRekening,
      imageUrl: dataBank[i].imageUrl,
      name: dataBank[i].name,
    })
  }
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Bank</Typography.Title>
        <Row justify="space-between" align="middle" gutter={[16, 8]}>
          <Col>
            <Button
              type="primary"
              style={{ borderRadius: 10 }}
              onClick={() => {
                setIsModalShow(true)
                setModalType('add')
              }}
            >
              Add
            </Button>
            <Modal
              afterClose={() => {
                setInitialValues({
                  name: '',
                  image: '',
                  nameBank: '',
                  nomorRekening: '',
                })
              }}
              centered
              footer={null}
              title={modalType === 'edit' ? 'Edit Item' : 'Add Item'}
              visible={isModalShow}
              onOk={handleOk}
              onCancel={handleCancel}
              bodyStyle={{ borderRadius: 20 }}
            >
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  const formData = new FormData()
                  for (const [key, value] of Object.entries(values)) {
                    if (key === 'image') {
                      formData.append('image', values.image.originFileObj)
                    } else {
                      formData.append(key, value)
                    }
                  }
                  if (modalType === 'edit') {
                    handleEdit(values._id, formData)
                  } else {
                    handleAdd(formData)
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, setFieldValue }) => {
                  return (
                    <>
                      <Typography.Text>Nama Bank</Typography.Text>
                      <Input
                        placeholder="Input Nama Bank"
                        className="mt-2"
                        style={{ borderRadius: 10 }}
                        name="nameBank"
                        value={values.nameBank}
                        onChange={handleChange}
                      />
                      <Typography.Text>Nomor Rekening</Typography.Text>
                      <Input
                        placeholder="Input Nomor Rekening"
                        className="mt-2"
                        style={{ borderRadius: 10 }}
                        name="nomorRekening"
                        value={values.nomorRekening}
                        onChange={handleChange}
                      />
                      <Typography.Text>Nama</Typography.Text>
                      <Input
                        placeholder="Input Nama Pemilik Rekening"
                        className="mt-2"
                        style={{ borderRadius: 10 }}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <Upload
                        accept="image/png, image/jpeg"
                        {...props}
                        name="image"
                        onChange={(e) => {
                          setFieldValue('image', e.file)
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
                      <Row justify="center" className="mt-2">
                        <Col>
                          <Button
                            type="primary"
                            style={{ borderRadius: 10, width: 450 }}
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )
                }}
              </Formik>
            </Modal>
          </Col>
          <SearchBar />
        </Row>
        <Table
          dataSource={data}
          columns={columns}
          bordered={true}
          onChange={onChange}
          pagination={{
            pageSize: 5,
            total: dataBank.length,
          }}
        />
      </Card>
    </>
  )
}
