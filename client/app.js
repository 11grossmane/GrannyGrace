import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, ProductFilter, Footer} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'
import flag from './images/flag.png'
import payment from './images/payment.png'
import apple from './images/apple.png'
import returnIcon from './images/return.png'
import logo from './images/logo.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-md-4 col-sm-12 col-xs-12 home-section">
            <a href="http://localhost:8080">
              <img alt="apple-logo" className="apple-logo" src={logo} />
              <h1 className="granny-grace-header">GRANNY GRACE</h1>
            </a>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 my-account-parent">
            <div className="my-account">My Account</div>
            <div className="cart-icon-div">
              <img className="cart-icon" alt="cart-icon" src={cartIcon} />
            </div>
          </div>
        </div>
      </div>

      <div className="row bottom-navbar-row">
        <Navbar />
      </div>

      <div className="row services-menu">
        <div className="container">
          <div className="row services-row">
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="flag" src={flag} />
              </span>Ships Nation-Wide
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="payment" src={payment} />
              </span>Secure Payments
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon apple" alt="apple" src={apple} />
              </span>High Quality Apples
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <Link to="/returns">
                <span className="service-icon">
                  <img
                    className="service-icon"
                    alt="return-icon"
                    src={returnIcon}
                  />
                </span>Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container outer-products-container">
        <div className="row">
          <div className="col-md-4 col-sm-12 product-filters-outer-container">
            <span className="product-filters-inner-title">Product Filters</span>
            <div className="product-filters-inner-container">Category</div>
            {/* <ProductFilter/> */}
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="toggle-product-styles">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Default Sorting
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </div>
              </div>
              <div className="grid">
                <FontAwesomeIcon icon={faGripHorizontal} /> Grid
              </div>
              <div className="list">
                <FontAwesomeIcon icon={faList} /> List
              </div>
            </div>
            <div id="products">
              <Routes />
            </div>
          </div>
        </div>
      </div>
      <>
        <Footer />
      </>
    </div>
  )
}

export default App
