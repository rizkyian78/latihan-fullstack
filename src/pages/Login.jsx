import React, { Component } from 'react'
import { notification } from 'antd'
import Header from 'parts/Header'
import BreadCrumbs from 'elements/Form/BreadCrumbs/index'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import Button from 'elements/Button'
import AdminImage from 'assets/images/image/undraw_mobile_login_ikmv.svg'
import Swal from 'sweetalert2'
import Clock from 'react-live-clock'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import schema from 'MasterValidation/mvLogin'

import 'moment/locale/id'

import './Login.scss'
import 'assets/antd.scss'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  logAuth = (data) => {
    axios.post(`http://localhost:8010/v1/auth/sign-in`, data).then((res) => {
      localStorage.setItem('Authorization', res.data.token)
      notification.success({
        message: `Hello`,
        duration: 1,
      })
      this.props.history.push('/example/192b7021-7a9b-4ec3-98d3-ca885fd8ee8a')
    })
  }
  render() {
    const breadCrumbList = [
      {
        pageTitle: 'Login',
        pageHref: '',
      },
      {
        pageTitle: 'Admin',
        pageHref: '',
      },
    ]

    return (
      <>
        <Helmet>
          <title>ThonHouse</title>
        </Helmet>
        <Fade top>
          <Header isCentered {...this.props} />
          <div className="container">
            <BreadCrumbs data={breadCrumbList} />
            <div className="column">
              <div className="is-hour">
                <Clock
                  format={'HH:mm:ss'}
                  ticking={true}
                  timezone={'Asia/Jakarta'}
                />
              </div>
              <div>
                {moment().locale('id').format('dddd')},{' '}
                {moment().locale('id').format('LL')}
              </div>
            </div>
            <div className="row">
              <div className="col-sm"></div>
              <div className="col-sm img-fluid">
                <figure className="figure">
                  <img
                    src={AdminImage}
                    alt="ntaps"
                    className="figure-img img-fluid"
                  />
                </figure>
              </div>
            </div>
            <Formik
              initialValues={this.state}
              validationSchema={schema.login}
              onSubmit={(values) => {
                this.logAuth(values)
              }}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                isSubmitting,
              }) => {
                return (
                  <>
                    {}
                    <div className="col-sm panel-box panel-font">
                      <div class="form-floating" style={{ paddingTop: 30 }}>
                        <label for="floatingInput">Email address</label>
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          id="floatingInput"
                          onChange={handleChange}
                          placeholder="name@example.com"
                        />
                        {touched.email && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div class="form-floating">
                        <label for="floatingPassword">Password</label>
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                          id="floatingPassword"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        {touched.password && (
                          <p className="bounce" style={{ color: 'red' }}>
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      style={{ width: 350, position: 'fixed' }}
                      isLoading={isSubmitting}
                      className="btn mt-2 btn-primary button-border justify-content-center"
                      onClick={handleSubmit}
                      href={`/admin/example`}
                    >
                      {' '}
                      Login
                    </Button>
                  </>
                )
              }}
            </Formik>
          </div>
        </Fade>
      </>
    )
  }
}

export default withRouter(Login)
