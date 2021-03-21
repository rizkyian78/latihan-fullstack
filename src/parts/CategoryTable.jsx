import React from 'react'
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Modal,
  Input,
  Tooltip,
  Popconfirm,
  notification,
  message,
  Skeleton,
} from 'antd'
import axios from 'axios'
import { Formik } from 'formik'
import schema from 'MasterValidation/mvBank'

import 'antd/dist/antd.css'
import './CategoryTable.scss'

export default function CategoryTable() {
  const [isModalShow, setIsModalShow] = React.useState(false)
  const [modalType, setModalType] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [initialValues, setInitialValues] = React.useState({
    id: '',
    name: '',
  })

  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get('http://localhost:8090/v1/category')
      .then((res) => {
        setIsLoading(false)
        setCategory(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [axios])

  const columns = [
    {
      title: 'No',
      width: 200,
      dataIndex: 'nomor',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.nomor - b.nomor,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name - b.name,
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
  function cancel(e) {
    message.error('Click on No')
  }
  function handleEdit(data) {
    axios
      .put(`http://localhost:8090/v1/category/${data.id}`, data)
      .then((res) => {
        axios
          .get('http://localhost:8090/v1/category')
          .then((res) => {
            notification.success({
              message: 'Berhasil Mengubah Data',
              duration: 2.5,
            })
            setCategory(res.data.data)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => message.error(err.message))
    setIsModalShow(false)
  }

  function handleDelete(data) {
    axios.delete(`http://localhost:8090/v1/category/${data.id}`).then((res) => {
      axios
        .get('http://localhost:8090/v1/category')
        .then((res) => {
          setCategory(res.data.data)
        })
        .catch((err) => message.error('Blok'))
    })
    notification.success({
      message: 'Berhasil Menghapus Data',
      duration: 2.5,
    })
  }
  const showModal = (value) => {
    setInitialValues(value)
    setIsModalShow(true)
    setModalType('edit')
  }
  const handleAdd = (data) => {
    axios
      .post(`http://localhost:8090/v1/category`, data)
      .then((res) => {
        axios
          .get('http://localhost:8090/v1/category')
          .then((res) => {
            notification.success({
              message: 'Berhasil Menambah Data',
              duration: 2.5,
            })
            setCategory(res.data.data)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => message.error('Harap Masukkan nama'))
    setCategory('')
    setIsModalShow(false)
  }
  const handleCancel = (e) => {
    setIsModalShow(false)
  }
  const data = []
  for (let i = 0; i < category.length; i++) {
    data.push({
      id: category[i]._id,
      nomor: i + 1,
      name: category[i].name,
    })
  }
  const onSearch = (value) => {
    axios
      .get(
        `http://localhost:8090/v1/category?filtered=[{"id":"name","value":"${value}"}]`,
      )
      .then((res) => {
        setCategory(res.data.data)
      })

    setCategory('')
  }
  function onChange(pagination, filters, sorter, extra) {
    if (sorter) {
      console.log(sorter.order)
      axios
        .get(
          `http://localhost:8090/v1/category?sorted=[{"id":"name","${sorter.order}":"true"}]`,
        )
        .then((res) => {
          setCategory(res.data.data)
        })
    }
  }
  return (
    <>
      <Card className="shadow mt-3" style={{ borderRadius: 30 }}>
        <Typography.Title level={2}>Category</Typography.Title>
        {isLoading ? (
          <>
            <Skeleton active round loading />
          </>
        ) : (
          <>
            <Row justify="space-between" align="middle" gutter={[16, 8]}>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalShow(true)
                    setModalType('add')
                  }}
                  style={{ borderRadius: 10 }}
                >
                  Add
                </Button>
              </Col>
              <Input.Search
                placeholder="Coba Cari Sini bos"
                onSearch={onSearch}
                style={{ width: 300, borderRadius: 30 }}
                allowClear
                enterButton
              />
            </Row>

            <Table
              columns={columns}
              onChange={onChange}
              bordered={true}
              dataSource={data}
              pagination={{
                pageSize: 5,
                total: category.length,
              }}
            />
            <Modal
              className="mbut"
              footer={null}
              title={modalType === 'edit' ? 'Edit' : 'Add'}
              visible={isModalShow}
              onCancel={handleCancel}
            >
              <Typography.Text style={{ fontWeight: 'bolder' }}>
                Name Category
              </Typography.Text>
              <Formik
                validationSchema={schema.category}
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  if (modalType === 'edit') {
                    handleEdit(values)
                  } else {
                    handleAdd(values)
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, errors, touched }) => {
                  const condition =
                    errors.name && touched.name ? 'mt-2 bounce' : 'mt-2'
                  return (
                    <>
                      <Input
                        allowClear
                        className={condition}
                        style={{ borderRadius: 10 }}
                        name="name"
                        value={values.name}
                        placeholder="Input Nama Category"
                        onChange={handleChange}
                      />
                      <Row justify="center" className="mt-2">
                        <Col>
                          <Button
                            type="primary"
                            style={{ width: 400, borderRadius: 10 }}
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
          </>
        )}
      </Card>
    </>
  )
}
