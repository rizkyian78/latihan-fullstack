import React from 'react'
import { Button } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

export default function WhatsAppButton(props) {
  return (
    <div className="fragment">
      <Button
        type="primary"
        size="large"
        shape="circle"
        className="button-color"
      >
        <WhatsAppOutlined className="icon-chat" />
      </Button>
    </div>
  )
}
