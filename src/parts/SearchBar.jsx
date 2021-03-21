import React from 'react'
import { Input, Space, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import axios from 'axios'

import 'antd/dist/antd.css'

export default function SearchBar(props) {
  const [category, setCategory] = React.useState('')
  const onSearch = (value) => {
    axios
      .get(
        `http://localhost:8090/v1/category?filtered=[{"id":"${props.field}","value":"${value}"}]`,
      )
      .then((res) => {
        setCategory(res.data.data)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Input.Search
        height={200}
        placeholder="Coba Cari Sini bos"
        onSearch={onSearch}
        size="large"
        style={{ width: 300, borderRadius: 30 }}
      />
    </>
  )
}
