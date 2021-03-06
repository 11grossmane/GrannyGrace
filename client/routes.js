import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import SingleProduct from './components/single-product'
import AllProducts from './components/all-products'
import Orders from './components/orders'
import MyAccount from './components/my-account'
import Cart from './components/cart'
import ReturnPolicy from './components/return-policy'
import Homepage from './components/homepage'
import Checkout from './components/checkout'
import AdminPortal from './components/admin-portal'
import OrderSummary from './components/order-summary'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/order-summary/:ind" component={OrderSummary} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/home/cart/:userId" component={Cart} />
        <Route exact path="/returns" component={ReturnPolicy} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Homepage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/admin-portal" component={AdminPortal} />
            <Route exact path="/returns" component={ReturnPolicy} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
