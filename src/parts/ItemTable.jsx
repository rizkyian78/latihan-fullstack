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
  Select,
  message,
  notification,
} from 'antd'
import SearchBar from './SearchBar'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { numberFormat } from 'helper/Common'
import { Formik } from 'formik'
import { isArray } from 'lodash'
import schema from 'MasterValidation/mvBank'

import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'
const { TabPane } = Tabs

function ItemTable(props) {
  const [dataItem, setDataItem] = React.useState('')
  const [dataCategory, setDataCategory] = React.useState([])
  const [tabs, setTabs] = React.useState('1')
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    title: '',
    price: '',
    city: '',
    categoryId: {
      id: '',
      name: '',
    },
    images: [],
    description: '',
  })

  React.useEffect(() => {
    axios
      .get('http://localhost:8090/v1/item')
      .then((res) => {
        setDataItem(res.data.data)
      })
      .catch((err) => console.log(err))
    axios
      .get('http://localhost:8090/v1/category')
      .then((res) => {
        setDataCategory(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [axios])

  const columns = [
    {
      title: 'No',
      width: 200,
      dataIndex: 'nomor',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value) => {
        return <Typography>Rp {numberFormat(value)}</Typography>
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'City',
      dataIndex: 'city',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Action',
      width: 300,
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
              <Tooltip placement="rightTop">
                <Button
                  style={{ borderRadius: 20 }}
                  onClick={() => showImage(value)}
                >
                  Image
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="rightTop">
                <Button
                  style={{ borderRadius: 20 }}
                  onClick={() => setTabs('2')}
                >
                  Add
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDelete(value)}
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
  const data = []
  for (let i = 0; i < dataItem.length; i++) {
    data.push({
      id: dataItem[i]._id,
      nomor: i + 1,
      title: dataItem[i].title,
      price: dataItem[i].price,
      country: dataItem[i].country,
      city: dataItem[i].city,
      categoryId: dataItem[i].categoryId,
      description: dataItem[i].description,
    })
  }
  const showModal = (data) => {
    setTabs('3')
    setInitialValues({ ...data })
  }
  const showImage = (data) => {
    props.history.push(`/admin/item/image/${data.id}`)
  }
  const handleAdd = (data) => {
    console.log(data)
    axios
      .post(`http://localhost:8090/v1/item`, data)
      .then((res) => {
        setTabs('1')
        axios.get('http://localhost:8090/v1/item').then((res) => {
          message.success('Berhasil Menambah Data')
          setDataItem(res.data.data)
          setTabs('1')
        })
      })
      .catch((err) => {
        message.error('Harap Masukkan nama')
      })
  }
  function handleEdit(id, formData) {
    axios
      .put(`http://localhost:8090/v1/item/${id}`, formData)
      .then((res) => {
        axios
          .get('http://localhost:8090/v1/item')
          .then((res) => {
            message.success('Data Berhasil Diubah')
            setDataItem(res.data.data)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => notification.error(err.message))
  }

  function handleDelete(data) {
    axios.delete(`http://localhost:8090/v1/item/${data._id}`).then((res) => {
      axios
        .get('http://localhost:8090/v1/item')
        .then((res) => {
          setDataItem(res.data.data)
        })
        .catch((err) => message.error('Blok'))
    })
    message.success('Data berhasil Di Delete')
  }
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Detail Item</Typography.Title>
        <Tabs
          tabBarGutter={6}
          size="middle"
          style={{ marginBottom: 32 }}
          type="card"
          defaultActiveKey="1"
          activeKey={tabs}
        >
          <TabPane tab="Show Item" key="1">
            <SearchBar />
            <Table dataSource={data} columns={columns} className="mt-2" />
          </TabPane>
          <TabPane tab="Edit Item" key="3" disabled>
            <Formik
              initialValues={initialValues}
              validationSchema={schema.item}
              onSubmit={(values, actions) => {
                const formData = new FormData()
                for (const [key, value] of Object.entries(values)) {
                  if (key === 'categoryId') {
                    formData.append('categoryId', value._id)
                  }
                  if (key === 'images') {
                    value.map((x) => {
                      formData.append('images', x.originFileObj)
                    })
                  }
                  formData.append(key, value)
                }
                handleEdit(values.id, formData)
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
              }) => {
                return (
                  <>
                    <Col span={20}>
                      <Typography.Text>
                        Title<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Title"
                        className="mt-2"
                        onChange={handleChange}
                        name="title"
                        value={values.title}
                        style={{ borderRadius: 10 }}
                      />
                      {touched.title && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.title}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        Price<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Harga"
                        className="mt-2"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        name="price"
                        style={{ borderRadius: 10 }}
                      />
                      {touched.price && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.price}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        City<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Nama Kota"
                        onChange={handleChange}
                        name="city"
                        value={values.city}
                        className="mt-2"
                        style={{ borderRadius: 10 }}
                      />
                      {touched.city && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.city}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        Category<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Col>
                        <Select
                          showSearch
                          allowClear
                          style={{ width: 500 }}
                          placeholder="Select a Category"
                          value={values.categoryId.name}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(values) =>
                            setFieldValue('categoryId', values)
                          }
                        >
                          {dataCategory.map((item) => {
                            return (
                              <Select.Option key={item._id}>
                                {item.name}
                              </Select.Option>
                            )
                          })}
                        </Select>
                        {touched.categoryId && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.categoryId}
                          </p>
                        )}
                      </Col>
                    </Col>
                    <Upload
                      {...props}
                      beforeUpload={(file, fileList) => {
                        const fileSize = file.size / 1024 / 1024
                        if (fileSize > 2) {
                          throw notification.error({
                            message: 'Image must smaller than 2MB!',
                            description:
                              'Mohon file yang di upload kurang dari 2MB',
                          })
                        }
                      }}
                      multiple
                      accept="image/png, image/jpeg"
                      onChange={(values) => {
                        setFieldValue('images', values.fileList)
                      }}
                    >
                      <Col className="mt-3">
                        <Typography.Text>
                          Image<span style={{ color: 'red' }}>*</span>
                        </Typography.Text>
                      </Col>
                      <Button icon={<UploadOutlined />}>
                        Click to Upload Image
                      </Button>
                    </Upload>
                    <Col span={20} className="mt-3">
                      <Typography.Text>
                        Description<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input.TextArea
                        placeholder="Input Deskripsi"
                        className="mt-2"
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        style={{ borderRadius: 10, height: 100 }}
                      />
                      {touched.description && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.description}
                        </p>
                      )}
                    </Col>
                    <Row justify="space-between">
                      <Button
                        className="mt-3"
                        type="primary"
                        style={{ borderRadius: 10, width: 300 }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button
                        className="mt-3"
                        type="primary"
                        style={{ borderRadius: 10, width: 300 }}
                        onClick={() => setTabs('1')}
                      >
                        Back
                      </Button>
                    </Row>
                    <Col className="mt-3">
                      <span style={{ color: 'red' }}>*</span> Required
                    </Col>
                  </>
                )
              }}
            </Formik>
          </TabPane>
          <TabPane tab={'Add Item'} key="2">
            <Formik
              initialValues={initialValues}
              validationSchema={schema.item}
              onSubmit={(values, actions) => {
                const formData = new FormData()
                for (const [key, value] of Object.entries(values)) {
                  if (isArray(value) && key === 'images') {
                    value.map((item) => {
                      formData.append(key, item.originFileObj)
                    })
                  }
                  formData.append(key, value)
                }
                handleAdd(formData)
                setTabs('1')
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
              }) => {
                return (
                  <>
                    <Col span={20}>
                      <Typography.Text>
                        Title<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Title"
                        className="mt-2"
                        onChange={handleChange}
                        name="title"
                        style={{ borderRadius: 10 }}
                      />
                      {touched.title && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.title}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        Price<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Harga"
                        className="mt-2"
                        type="number"
                        onChange={handleChange}
                        name="price"
                        style={{ borderRadius: 10 }}
                      />
                      {touched.price && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.price}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        City<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input
                        placeholder="Input Nama Kota"
                        onChange={handleChange}
                        name="city"
                        className="mt-2"
                        style={{ borderRadius: 10 }}
                      />
                      {touched.city && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.city}
                        </p>
                      )}
                    </Col>
                    <Col span={20}>
                      <Typography.Text>
                        Category<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Col>
                        <Select
                          showSearch
                          allowClear
                          style={{ width: 500 }}
                          placeholder="Select a Category"
                          value={values.categoryId.name}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(values) =>
                            setFieldValue('categoryId', values)
                          }
                        >
                          {dataCategory.map((item) => {
                            return (
                              <Select.Option key={item._id}>
                                {item.name}
                              </Select.Option>
                            )
                          })}
                        </Select>
                        {touched.categoryId && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.categoryId}
                          </p>
                        )}
                      </Col>
                    </Col>
                    <Upload
                      {...props}
                      multiple
                      accept="image/png, image/jpeg"
                      onChange={(values) => {
                        setFieldValue('images', values.fileList)
                      }}
                    >
                      <Col className="mt-3">
                        <Typography.Text>
                          Image<span style={{ color: 'red' }}>*</span>
                        </Typography.Text>
                      </Col>
                      <Button icon={<UploadOutlined />}>
                        Click to Upload Image
                      </Button>
                    </Upload>
                    <Col span={20} className="mt-3">
                      <Typography.Text>
                        Description<span style={{ color: 'red' }}>*</span>
                      </Typography.Text>
                      <Input.TextArea
                        placeholder="Input Deskripsi"
                        className="mt-2"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        style={{ borderRadius: 10, height: 100 }}
                      />
                      {touched.description && (
                        <p className="bounce" style={{ color: 'red' }}>
                          {errors.description}
                        </p>
                      )}
                    </Col>
                    <Row justify="space-between">
                      <Button
                        className="mt-3"
                        type="primary"
                        style={{ borderRadius: 10, width: 300 }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button
                        className="mt-3"
                        type="primary"
                        style={{ borderRadius: 10, width: 300 }}
                        onClick={() => setTabs('1')}
                      >
                        Back
                      </Button>
                    </Row>
                    <Col className="mt-3">
                      <span style={{ color: 'red' }}>*</span> Required
                    </Col>
                  </>
                )
              }}
            </Formik>
          </TabPane>
        </Tabs>
      </Card>
    </>
  )
}

export default withRouter(ItemTable)
