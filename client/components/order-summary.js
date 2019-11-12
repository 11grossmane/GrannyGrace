import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchOrders} from '../store/orders'
import 'bootstrap/dist/css/bootstrap.min.css'

const OrderSummary = props => {
  useEffect(
    () => {
      if (props.user) {
        props.fetchOrders(props.user.id)
      }
    },
    [props.user]
  )
  const latest =
    props.match.params.ind === 'current'
      ? props.orders[props.orders.length - 1]
      : props.orders[+props.match.params.ind]

  console.log('prop orders', latest)
  return latest ? (
    <div className="card">
      <h1>Order Summary</h1>
      <ul className="list-group list-group-flush">
        {latest.lockedProducts.map(prod => {
          return (
            <div
              className="list-group-item list-group-item-action flex-column align-items-start"
              key={prod.id}
            >
              <Link to={`/products/${prod.id}`} id="cart-item" href="#!">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 card-title">{prod.name}</h5>
                  <small />
                </div>
                <p className="mb-1 card-text">{prod.description}</p>
                <small className="card-text">Price: ${prod.price}</small>
              </Link>
            </div>
          )
        })}
      </ul>
      <h4 className="list-group-item mb-1 card-title">
        Total: ${latest.price}
      </h4>
    </div>
  ) : (
    <span />
  )
}

export default withRouter(
  connect(({orders, user}) => ({orders, user}), {fetchOrders})(OrderSummary)
)
