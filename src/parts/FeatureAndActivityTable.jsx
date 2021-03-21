import React from 'react'
import {
  Table,
  Row,
  Col,
  Tooltip,
  Button,
  Popconfirm,
  Card,
  Typography,
  Input,
  Upload,
  Tabs,
  notification,
  Image,
  Modal,
  Menu,
  Dropdown,
} from 'antd'
import SearchBar from './SearchBar'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import { Formik } from 'formik'
import 'antd/dist/antd.css'
import axios from 'axios'
import schema from 'MasterValidation/mvFeature'

import './CategoryTable.scss'
import 'assets/antd.scss'

const { TabPane } = Tabs

export default function FeatureAndActivity(props) {
  const [size, setSize] = React.useState('small')
  const [dataFeature, setDataFeature] = React.useState([])
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    name: '',
    qty: 0,
    imageUrl: {},
  })
  const [isModalShow, setIsModalShow] = React.useState(false)

  React.useEffect(() => {
    axios.get('http://localhost:8090/v1/feature').then((res) => {
      setDataFeature(res.data.data)
    })
  }, [axios])
  const columnsFeature = [
    {
      title: 'No',
      width: 20,
      dataIndex: 'nomor',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Title',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Image URL',
      dataIndex: 'imageUrl',
      width: 200,
      render: (path) => {
        return (
          <Card style={{ borderRadius: 20 }}>
            <Image
              width={200}
              height={100}
              src={
                path
                  ? `http://localhost:8090/${path}`
                  : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
              }
            />
          </Card>
        )
      },
    },
    {
      title: 'Action',
      width: 200,
      render: (value) => {
        return (
          <Row gutter={[2]} justify="space-around">
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
                title="Are you sure to delete this task?"
                // onConfirm={() => handleDelete(value)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="left"
                onConfirm={() => handleDelete(value)}
              >
                <Tooltip placement="rightTop">
                  <Button style={{ borderRadius: 20 }}>Delete</Button>
                </Tooltip>
              </Popconfirm>
            </Col>
          </Row>
        )
      },
    },
  ]
  const columnsActivity = [
    {
      title: 'No',
      width: 200,
      dataIndex: 'nomor',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Type',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Image URL',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Action',
      width: 200,
      render: (value) => {
        return (
          <Row gutter={[2]} justify="space-around">
            <Col>
              <Tooltip placement="rightTop">
                <Button style={{ borderRadius: 20 }}>Edit</Button>
              </Tooltip>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure to delete this task?"
                // onConfirm={() => handleDelete(value)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <Tooltip placement="rightTop">
                  <Button style={{ borderRadius: 20 }}>Delete</Button>
                </Tooltip>
              </Popconfirm>
            </Col>
          </Row>
        )
      },
    },
  ]
  const showModal = (value) => {
    setInitialValues(value)
    setIsModalShow(true)
  }
  const handleCancel = (e) => {
    setIsModalShow(false)
  }
  const handleAdd = (data) => {
    axios
      .post(`http://localhost:8090/v1/feature`, data)
      .then((res) => {
        notification.success({
          message: 'Berhasil Menambah Data',
          duration: 2.5,
        })
        axios.get('http://localhost:8090/v1/feature').then((res) => {
          setDataFeature(res.data.data)
        })
      })
      .catch((err) => {
        notification.error({
          message: 'Gagal Menambah Data',
          description: 'Mohon Cek Kembali Data',
          duration: 2.5,
        })
      })
  }

  const handleDelete = (data) => {
    axios
      .delete(`http://localhost:8090/v1/feature/${data._id}`)
      .then((res) => {
        notification.success({
          message: 'Berhasil Menghapus Data',
          duration: 2.5,
        })
        axios.get('http://localhost:8090/v1/feature').then((res) => {
          setDataFeature(res.data.data)
        })
      })
      .catch((err) => {
        notification.error({
          message: 'Gagal Menghapus Data',
          duration: 2.5,
        })
      })
  }
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Detail Item</Typography.Title>
        <Tabs defaultActiveKey="1" size={size} style={{ marginBottom: 32 }}>
          <TabPane tab="Show Feature" key="1">
            <Formik
              initialValues={initialValues}
              validationSchema={schema.create}
              onSubmit={(values, actions) => {
                const formData = new FormData()
                for (const [key, value] of Object.entries(values)) {
                  if (key === 'imageUrl') {
                    formData.append('imageUrl', value.originFileObj)
                  } else {
                    formData.append(key, value)
                  }
                }
                handleAdd(formData)
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                errors,
                touched,
                setFieldValue,
              }) => {
                return (
                  <Row>
                    <Col span={6}>
                      <Col>
                        <Typography.Text>Name</Typography.Text>
                        <Input
                          placeholder="Enter Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          style={{ borderRadius: 10 }}
                        />
                        {touched.name && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.name}
                          </p>
                        )}
                      </Col>

                      <Col span={12}>
                        <Typography.Text>Quantity</Typography.Text>
                        <Input
                          type="number"
                          size="large"
                          placeholder="0"
                          name="qty"
                          onChange={handleChange}
                          style={{ borderRadius: 10 }}
                        />
                        {touched.qty && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.qty}
                          </p>
                        )}
                      </Col>
                      <Upload
                        {...props}
                        accept="image/png, image/jpeg"
                        name="imageUrl"
                        onChange={(e) => {
                          setFieldValue('imageUrl', e.file)
                        }}
                      >
                        <Col className="mt-3"></Col>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload Image
                        </Button>
                      </Upload>
                      <Button
                        className="mt-3"
                        type="primary"
                        // disabled={touched.name && touched.qty ? true : false}
                        style={{ borderRadius: 10, width: 200 }}
                        onClick={handleSubmit}
                      >
                        Save
                      </Button>
                    </Col>
                    <Col span={18}>
                      <Row justify="end">
                        <SearchBar />
                      </Row>
                      <Table
                        columns={columnsFeature}
                        dataSource={dataFeature}
                      />
                    </Col>
                  </Row>
                )
              }}
            </Formik>
          </TabPane>
          <TabPane tab="Show Activity" key="2">
            <Row>
              <Col span={10}>
                <Col span={20}>
                  <Typography.Text>Name</Typography.Text>
                  <Input
                    placeholder="Input Nama Category"
                    className="mt-3 mb-3"
                    style={{ borderRadius: 10 }}
                  />
                </Col>
                <Col span={20}>
                  <Typography.Text>Type</Typography.Text>
                  <Input
                    placeholder="Input Nama Category"
                    className="mt-3"
                    style={{ borderRadius: 10 }}
                  />
                </Col>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>
                    Click to Upload Image
                  </Button>
                </Upload>
                <Button className="mt-3" type="primary">
                  Save
                </Button>
              </Col>
              <Col span={14}>
                <Row justify="end">
                  <SearchBar />
                  <Table columns={columnsActivity} className="mt-2" />
                </Row>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Modal
          className="mbut"
          bodyStyle={{ fontWeight: 'bolder' }}
          footer={null}
          title={'Edit'}
          visible={isModalShow}
          onCancel={handleCancel}
        >
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={schema.create}
            onSubmit={(values, actions) => {
              console.log(values, actions)
            }}
          >
            {({ values, handleChange, setFieldValue, handleSubmit }) => {
              return (
                <>
                  <Typography.Text style={{ fontWeight: 'bolder' }}>
                    Name
                  </Typography.Text>
                  <Input
                    placeholder="Enter Name"
                    className="mb-3"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    style={{ borderRadius: 10 }}
                  />
                  <Typography.Text style={{ fontWeight: 'bolder' }}>
                    Quantity
                  </Typography.Text>
                  <br></br>
                  <Input
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter Quantity"
                    size="large"
                    className="mb-3"
                    name="qty"
                    value={values.qty}
                    style={{ borderRadius: 10, width: 300 }}
                  />
                  <Upload
                    {...props}
                    name="imageUrl"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      setFieldValue('imageUrl', e.file)
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Click to Upload Image
                    </Button>
                  </Upload>
                  <Button
                    className="mt-3"
                    type="primary"
                    onSubmit={handleSubmit}
                    style={{ borderRadius: 10, width: 470 }}
                  >
                    Update
                  </Button>
                </>
              )
            }}
          </Formik>
        </Modal>
      </Card>
    </>
  )
}
