import React, { Component } from 'react'

import Header from 'parts/Header'
import Fade from 'react-reveal/Fade'

import Button from 'elements/Button'
import Stepper from 'elements/Stepper'
import Controller from 'elements/Stepper/Controller/index'
import Numbering from 'elements/Stepper/Numbering/index'
import Meta from 'elements/Stepper/Meta/index'
import MainContent from 'elements/Stepper/MainContent/index'

import BookingInformation from 'parts/CheckOut/BookingInformation'
import Payment from 'parts/CheckOut/Payment'
import Completed from 'parts/CheckOut/Complete'

import ItemDetails from 'json/itemDetails.json'

export default class CheckOut extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      proofPayment: '',
      bankName: '',
      bankHolder: '',
    },
  }
  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    })
  }
  componentDidMount() {
    window.scroll(0, 0)
  }
  render() {
    const { data } = this.state
    const checkout = {
      duration: 3,
    }
    const steps = {
      bookingInformation: {
        title: 'Booking Information',
        description: 'Please fill up the blank fields',
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            ItemDetails={ItemDetails}
            onChange={this.onChange}
          />
        ),
      },
      payment: {
        title: 'Payment',
        description: 'Masukkan Pembayaran',
        content: (
          <Payment
            data={data}
            checkout={checkout}
            ItemDetails={ItemDetails}
            onChange={this.onChange}
          />
        ),
      },
      complete: {
        title: 'Yay! Completed',
        description: null,
        content: <Completed />,
      },
    }
    return (
      <>
        <Header isCentered {...this.props} />
        <Stepper steps={steps}>
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering
                data={steps}
                current={CurrentStep}
                style={{ marginBottom: 50 }}
              />
              <Meta data={steps} current={CurrentStep} />
              <MainContent data={steps} current={CurrentStep} />
              {CurrentStep === 'bookingInformation' && (
                <Fade>
                  <Controller>
                    {data.firstName !== '' &&
                      data.lastName !== '' &&
                      data.email !== '' &&
                      data.phone !== '' && (
                        <Fade>
                          <Button
                            className="btn mb-3"
                            type="button"
                            isBlock
                            isPrimary
                            hasShadow
                            onClick={nextStep}
                          >
                            Continue to Book
                          </Button>
                        </Fade>
                      )}
                    <Button
                      className="btn"
                      type="link"
                      isBlock
                      isLight
                      href={`/properties/${ItemDetails._id}`}
                    >
                      Cancel
                    </Button>
                  </Controller>
                </Fade>
              )}
              {CurrentStep === 'payment' && (
                <Controller>
                  {data.proofPayment !== '' &&
                    data.bankName !== '' &&
                    data.bankHolder !== '' && (
                      <Fade>
                        <Button
                          className="btn mb-3"
                          type="button"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={nextStep}
                        >
                          Continue to Book
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn"
                    type="button"
                    isBlock
                    isLight
                    onClick={prevStep}
                  >
                    Cancel
                  </Button>
                </Controller>
              )}
              {CurrentStep === 'complete' && (
                <Controller>
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isPrimary
                    hasShadow
                    href=""
                  >
                    Back to Home
                  </Button>
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </>
    )
  }
}
