import React, { Component } from 'react'
import propTypes from 'prop-types'

import Button from 'elements/Button/index'
import { InputDate, InputNumber } from 'elements/Form'
import Swal from 'sweetalert2'

export default class BookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isContinue: false,
      isCheck: false,
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
    }
  }

  updateData = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    })
  }
  testCheck = (e) => {
    this.setState({
      isCheck: !this.state.isCheck,
      isContinue: true,
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: 'success',
      title: 'Kamar Tersedia',
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state

    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate)
      const endDate = new Date(data.date.endDate)
      const countDuration = new Date(endDate - startDate).getDate()
      this.setState({
        data: {
          ...this.state.data,
          duration: countDuration,
        },
      })
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate)
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +data.duration - 1),
      )
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          date: {
            ...this.state.data.date,
            endDate: endDate,
          },
        },
      })
    }
  }
  render() {
    const { data } = this.state
    const { itemDetails, startBooking } = this.props

    return (
      <div className="card bordered" style={{ padding: '60px 80px' }}>
        <h4 className="mb-3">Start Booking</h4>
        <h5 className="h2 mb-4">
          <span className="text-teal">Rp. {itemDetails.price} </span>
          <span className="text-gray-500 font-weight-light">
            per {itemDetails.unit}
          </span>
        </h5>
        <label htmlFor="duration">How Long You Will Stay ?</label>
        <InputNumber
          max={30}
          suffix={' Night'}
          isSuffixPlura={true}
          onChange={this.updateData}
          name="duration"
          value={data.duration}
        />
        <label htmlFor="date">Pick A Date</label>
        <InputDate onChange={this.updateData} name="date" value={data.date} />
        <h6
          className="text-gray-500 font-weight-light"
          style={{ marginBottom: 40 }}
        >
          You Will Pay{' '}
          <span className="text-gray-900 font-weight-bold">
            Rp. {itemDetails.price * data.duration} Rupiah
          </span>{' '}
          per{' '}
          <span className="text-gray-900 font-weight-bold">
            {data.duration} {itemDetails.unit}
          </span>
        </h6>
        <Button
          className="btn btn-outline-danger"
          hasShadow
          isBlock
          onClick={this.testCheck}
        >
          Check Available
        </Button>
        <Button
          className="btn"
          hasShadow
          isPrimary
          isBlock
          onClick={startBooking}
        >
          Continue To Book
        </Button>
      </div>
    )
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
}
