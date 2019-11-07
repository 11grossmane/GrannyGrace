import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {withRouter} from 'react-router-dom'

const Cart = props => {
  console.log('TCL: props.curCart', props.curCart)
  let totalPrice = 0
  if (!props.curCart.products || !props.curCart.products[0]) {
    return <span>cart is empty</span>
  }
  return (
    <div>
      {props.curCart.products.map(prod => {
        totalPrice += prod.price
        return (
          <div key={prod.id}>
            <div>{prod.name}</div>
            <div>{prod.price}</div>
          </div>
        )
      })}
      <div>Total Price: {totalPrice}</div>
    </div>
  )
}

export default withRouter(
  connect(({curCart, user}) => ({curCart, user}), {
    fetchUpdateCart,
    sessionChecker,
    auth
  })(Cart)
)
