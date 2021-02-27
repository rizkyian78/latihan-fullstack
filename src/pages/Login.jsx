import React, { Component } from 'react'
import Header from 'parts/Header'
import BreadCrumbs from 'elements/Form/BreadCrumbs/index'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import Button from 'elements/Button'
import AdminImage from 'assets/images/image/undraw_mobile_login_ikmv.svg'
import Swal from 'sweetalert2'
import Clock from 'react-live-clock'
import { Helmet } from 'react-helmet'
import 'moment/locale/id'

import './Login.scss'

export default class Login extends Component {
  state = {
    isLogin: false,
  }
  testCheck = (e) => {
    this.setState({
      isLogin: true,
    })
    Swal.fire('Swoosh', 'Login Success', 'success')
  }
  render() {
    const breadCrumbList = [
      {
        pageTitle: 'Login',
        pageHref: '/admin/category',
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
              <div className="col-sm">
                <p style={{ color: '#fff' }} className="auth-box mt-5">
                  ADMIN
                </p>
              </div>
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
            <div className="col-sm panel-box panel-font">
              <div class="form-floating mb-3 mt-3" style={{ paddingTop: 30 }}>
                <label for="floatingInput">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form-floating">
                <label for="floatingPassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div>
                <Button
                  className="btn btn-light mt-5 button-border justify-content-end"
                  onClick={this.testCheck}
                  href={`/admin/example`}
                >
                  {' '}
                  Login as Admin
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </>
    )
  }
}
