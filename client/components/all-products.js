import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {ProductFilter} from './product-filter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getProductsFromServer()
  }
  addToCart(productId) {
    if (this.props.user.id) {
      this.props.fetchUpdateCart(this.props.user.id, productId)
    } else {
      console.log(
        'user can only add to cart if logged in right now, need to add session support'
      )
    }
  }
  render() {
    return (
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
              <div className="inner-products-container">
                Products
                <div className="container-fluid">
                  <div className="card-columns">
                    {this.props.allProducts.map(elem => {
                      return (
                        <div key={elem.id} className="card">
                          <Link key={elem.id} to={`/products/${elem.id}`}>
                            <img className="card-img-top" src={elem.imageUrl} />
                            <div className="card-body">
                              <h4
                                className="card-title"
                                style={{color: 'black'}}
                              >
                                {elem.name} for {elem.price}
                              </h4>
                              <p className="card-text">{elem.decription}</p>
                            </div>
                          </Link>
                          <button
                            type="button"
                            onClick={evt => {
                              this.addToCart(elem.id)
                            }}
                          >
                            Add To Cart
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts(dispatch)),
    fetchUpdateCart: (userId, productId) =>
      dispatch(fetchUpdateCart(userId, productId)),
    sessionChecker: () => dispatch(sessionChecker()),
    auth: (email, password, method, isGuest) =>
      dispatch(auth(email, password, method, isGuest))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
