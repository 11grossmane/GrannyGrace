import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {setCart, fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/cart.css'

const Cart = props => {
  useEffect(
    () => {
      console.log(props.user.email)
      if (props.user.id) {
        props.fetchUpdateCart(props.user.id)
      } else {
        //change below to use a thunk that gets guest cart data from Session.data
        props.setCart([])
      }
    },
    [props.user.id]
  )
  let totalPrice = 0
  if (!props.curCart || !props.curCart[0]) {
    return <span>cart is empty</span>
  }
  return (
    <React.Fragment>
      <div className="card">
        <ul className="list-group list-group-flush">
          {props.curCart.map(prod => {
            totalPrice += prod.price
            return (
              <a
                key={prod.id}
                id="cart-item"
                href="#!"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 card-title">{prod.name}</h5>
                  <small />
                </div>
                <p className="mb-1 card-text">{prod.description}</p>
                <small className="card-text">Price: ${prod.price}</small>
              </a>
              // <li className='list-group-item list-group-item-primary list-group-item-action flex-column align-items-start active' key={prod.id}>
              //   <div className='d-flex w-100 justify-content-between'>{prod.name}</div>
              //   <h5 className = 'mb-1'>Price: {prod.price}</h5>
              // </li>
            )
          })}
          <h4 className="list-group-item mb-1 card-title">
            Total Price: ${totalPrice}
          </h4>
        </ul>
      </div>
      <button type="button" className="btn btn-lg btn-primary">
        Checkout
      </button>
    </React.Fragment>
  )
}

export default withRouter(
  connect(({curCart, user}) => ({curCart, user}), {
    fetchUpdateCart,
    setCart,
    sessionChecker,
    auth
  })(Cart)
)
