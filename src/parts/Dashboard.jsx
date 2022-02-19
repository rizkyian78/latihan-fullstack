import React from 'react'
import axios from 'axios'
import { Card, Col, Row, Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import { months } from 'moment'
import 'assets/antd.scss'

function Dashboard() {
  const [data, setData] = React.useState({
    totalHouse: 0,
    totalMember: 0,
    totalBooking: 0,
  })
  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
      ],
    },
  }
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get('http://localhost:8090/v1/booking')
      .then((res) => {
        setIsLoading(false)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [axios])
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Line
          options={options}
          data={{
            datasets: [
              {
                label: '# of Votes',
                data: [12, 1, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y-axis-1',
              },
            ],
            labels: months(),
            // [
            //   'January',
            //   'February',
            //   'March',
            //   'April',
            //   'May',
            //   'June',
            //   'July',
            //   'September',
            //   'October',
            //   'November',
            //   'December',
            // ],
          }}
          width={100}
          height={50}

          //   options={{ maintainAspectRatio: false }}
        />
        <Card
          className="mt-3 "
          bodyStyle={{
            borderLeft: '5px solid teal',
            borderWidth: 'thick',
            borderBottomLeftRadius: '5px',
            borderTopLeftRadius: 5,
          }}
          loading={isLoading}
          style={{
            borderRadius: 10,
            color: 'black',
          }}
        >
          <Typography>Order</Typography>
          <Typography>{data.totalBooking}</Typography>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className="mt-3 "
          loading={isLoading}
          bodyStyle={{
            borderLeft: '5px solid green',
            borderWidth: 'thick',
            borderBottomLeftRadius: '5px',
            borderTopLeftRadius: 5,
          }}
          style={{
            borderRadius: 10,
            color: 'black',
          }}
        >
          <Typography>House</Typography>
          <Typography>{data.totalBooking}</Typography>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className="mt-3 "
          loading={isLoading}
          bodyStyle={{
            borderLeft: '1px solid blue',
            borderWidth: 'thick',
            borderBottomLeftRadius: '5px',
            borderTopLeftRadius: 5,
          }}
          style={{
            borderRadius: 10,
            color: 'black',
          }}
        >
          <Typography>Member</Typography>
          <Typography>{data.totalBooking}</Typography>
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard
