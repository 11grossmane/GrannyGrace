import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Footer} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'
import {getUser, sessionChecker, auth} from './store/user'
import flag from './images/flag.png'
import payment from './images/payment.png'
import apple from './images/apple.png'
import returnIcon from './images/return.png'
import logo from './images/logo.png'

import {fetchUpdateCart} from './store/curCart'

const App = props => {
  //making the user on state default to admin user, change this useEffect to test different types of users

  // const asyncSessionCheck = async () => {
  //   await props.sessionChecker()
  // }
  // useEffect(() => {
  //   if (!props.user.id) {
  //     console.log('checking session')
  //     asyncSessionCheck()

  //     console.log('just checked session user is', props.user.id)

  //     // if (!props.user.id) {
  //     //   props.auth(null, '1234', 'signup', true)
  //     // }
  //   }
  // }, [])
  // useEffect(
  //   () => {
  //     if (props.user.id) {
  //       props.fetchUpdateCart(props.user.id)
  //     }
  //   },
  //   [props.user]
  // )
  console.log('cartIcon', cartIcon)
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-md-4 col-sm-12 col-xs-12 home-section">
            <a href="http://localhost:8080">
              <img alt="apple-logo" className="apple-logo" src={`/${logo}`} />
              <h1 className="granny-grace-header">GRANNY GRACE</h1>
            </a>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 my-account-parent">
            <div className="my-account">My Account</div>
            <div className="cart-icon-div">
              <Link to={`/home/cart/${props.user.id}`}>
                <img
                  className="cart-icon"
                  alt="cart-icon"
                  src={`/${cartIcon}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row bottom-navbar-row">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="row services-menu">
        <div className="container">
          <div className="row services-row">
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="flag" src={`/${flag}`} />
              </span>Ships Nation-Wide
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon"
                  alt="payment"
                  src={`/${payment}`}
                />
              </span>Secure Payments
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon apple"
                  alt="apple"
                  src={`/${apple}`}
                />
              </span>High Quality Apples
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <Link to="/returns">
                <span className="service-icon">
                  <img
                    className="service-icon"
                    alt="return-icon"
                    src={`/${returnIcon}`}
                  />
                </span>Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="mainRoutes">
        <Routes />
      </div>

      <>
        <Footer />
      </>
    </div>
  )
}

export default connect(({user}) => ({user}), {
  getUser,
  auth,
  sessionChecker,
  fetchUpdateCart
})(App)
