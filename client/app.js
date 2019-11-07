import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Footer} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/app.css'

import {getUser, sessionChecker, auth} from './store/user'

import {fetchUpdateCart} from './store/curCart'

const App = props => {
  //check session with useEffect(()=>{},[]), load cart data from Session, if there is any and put it on curCart, if user signs up, use addProductsToCart(curCart) thunk to add products from curCart onto user with magic method user.addProducts(req.body) -->req.body should be an array, then refetch updated, and res.json(user.products)

  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-md-4 col-sm-12 col-xs-12 home-section">
            <a href="http://localhost:8080">
              <img alt="apple-logo" className="apple-logo" src="/logo.png" />
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
                  src="/carticon.png"
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
                <img className="service-icon" alt="flag" src="/flag.png" />
              </span>Ships Nation-Wide
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon"
                  alt="payment"
                  src="/payment.png"
                />
              </span>Secure Payments
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon apple"
                  alt="apple"
                  src="/apple.png"
                />
              </span>High Quality Apples
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <Link to="/returns">
                <span className="service-icon">
                  <img
                    className="service-icon"
                    alt="return-icon"
                    src="/return.png"
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
