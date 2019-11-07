import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchProducts} from '../store/products'

import '../css/navbar.css'

const Navbar = ({handleClick, isLoggedIn, getProductsFromServer}) => (
  <div className="lower-nav">
    {/* <h1 className="granny-grace-header">GRANNY GRACE</h1> */}
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products" onClick={getProductsFromServer}>
            All Products
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="bottom-navbar-container">
          {/* The navbar will show these links before you log in */}
          <span className="bottom-navbar-items">
            <Link to="/login">Login</Link>
            <hr className="display-at-mobile" />
            <Link to="/signup">Sign Up</Link>
            <hr className="display-at-mobile" />
            <Link to="/products" onClick={getProductsFromServer}>
              All Products
            </Link>

            <hr className="display-at-mobile" />
            <Link to="/products/1">Test Link to Product 1</Link>
          </span>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getProductsFromServer: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  getProductsFromServer: PropTypes.func.isRequired
}
