import React, { useEffect } from 'react'
import { Image, message, Row, Col, Card, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import NavbarAdmin from 'parts/NavbarAdmin'
import SideBar from 'parts/Sidebar'

import 'antd/dist/antd.css'

function ShowImage(props) {
  const {
    match: {
      params: { id },
    },
  } = props
  const [dataImage, setDataImage] = React.useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8090/v1/item/${id}`)
      .then((res) => {
        setDataImage(res.data.data)
      })
      .catch((err) => message.error('ini error'))
  }, [axios])
  return (
    <>
      <NavbarAdmin />

      <Row align="top" gutter={12}>
        <SideBar />
        {dataImage.images ? (
          dataImage.images.map((x, index) => {
            if (index === 0) {
            }
            return (
              <Col className="mt-3">
                <Card
                  style={{
                    borderRadius: 10,
                    boxShadow: '2px 2px 4px #000000',
                  }}
                  hoverable
                >
                  <Image
                    key={x._id}
                    height={index === 1 ? 200 : 350}
                    width={index === 1 ? 300 : 200}
                    src={`http://localhost:8090/${x.imageUrl}`}
                  />
                </Card>
              </Col>
            )
          })
        ) : (
          <p>Loading</p>
        )}
      </Row>
      <Button onClick={() => props.history.push('/admin/item')}>Back</Button>
    </>
  )
}

export default withRouter(ShowImage)
