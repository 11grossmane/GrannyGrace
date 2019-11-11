import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, fetchSearchedProducts} from '../store/products'
import {fetchUpdateCart, fetchGuestCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import SearchBar from './searchbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'
import '../css/allproducts.css'
import _ from 'lodash'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  state = {
    view: 'grid',
    sortValue: 'lowToHigh',
    products: []
  }

  componentDidMount() {
    const {products} = this.props
    if (products.length) {
      this.setState({products})
    } else {
      this.props.getProductsFromServer()
    }
  }
  //if no products in db, we need to seed.
  componentDidUpdate(prevProps) {
    const newProducts = this.props.products
    if (
      newProducts.length &&
      newProducts.length !== prevProps.products.length
    ) {
      this.setState({
        products: newProducts
      })
    }
  }

  addToCart(productId) {
    if (this.props.user.id) {
      this.props.fetchUpdateCart(this.props.user.id, productId)
    } else {
      this.props.fetchGuestCart(productId)
    }
  }

  filterProducts = category => {
    this.setState({
      products: this.props.products.filter(p => p.category === category)
    })
  }

  handleSort = e => {
    const newSortValue = e.target.value
    const {products} = this.props
    let newProducts = []
    switch (newSortValue) {
      case 'lowToHigh':
        newProducts = products.sort((a, b) => a.price - b.price)
        break
      case 'highToLow':
        newProducts = products.sort((a, b) => b.price - a.price)
        break
      case '':
        newProducts = products.sort((a, b) => a.price - b.price)
        break
      default:
    }
    this.setState({sortValue: newSortValue, products: newProducts})
  }

  render() {
    const {sortValue, view, products} = this.state

    return (
      <div className="container outer-products-container">
        <div className="row">
          <div className="col-md-4 col-sm-12 product-filters-outer-container">
            <div className="product-filters-sticky-container">
              <span className="product-filters-inner-title">
                Product Filters
              </span>
              <div className="product-filters-inner-container">
                <span className="category-title">Category</span>
                {_.uniqBy(this.props.products, 'category')
                  .sort((a, b) => (a.category < b.category ? -1 : 1))
                  .map((p, i) => (
                    <div
                      className="product-category"
                      onClick={() => this.filterProducts(p.category)}
                      key={i}
                    >
                      {p.category}
                    </div>
                  ))}
              </div>
              <SearchBar />
            </div>
            {/* <ProductFilter/> */}
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="toggle-product-styles">
              <div className="dropdown">
                Sort By Price:{' '}
                <select
                  className="dropdown-menu-specific"
                  value={sortValue}
                  onChange={this.handleSort}
                >
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </div>
              </div>
              <div
                onClick={() => this.setState({view: 'grid'})}
                className="grid"
              >
                <FontAwesomeIcon icon={faGripHorizontal} /> Grid
              </div>
              <div
                onClick={() => this.setState({view: 'list'})}
                className="list"
              >
                <FontAwesomeIcon icon={faList} /> List
              </div>
            </div>
            <div id="products">
              <div className="inner-products-container">
                Products
                <div className="container-fluid">
                  {view === 'grid' ? (
                    <div className="card-columns">
                      {products.map(elem => {
                        return (
                          <div key={elem.id} className="card">
                            <Link key={elem.id} to={`/products/${elem.id}`}>
                              <img
                                className="card-img-top"
                                src={elem.imageUrl}
                              />
                            </Link>
                            <div className="card-body">
                              <h4
                                className="card-title"
                                style={{color: 'black'}}
                              >
                                {elem.name}
                              </h4>
                              <p className="card-subtitle mb-2 text-muted">
                                $ {elem.price}
                              </p>

                              {this.props.user.isAdmin ? (
                                <p className="card-subtitle mb-2 text-muted">
                                  Quantity: {elem.quantity}
                                </p>
                              ) : null}
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => {
                                  this.addToCart(elem.id)
                                }}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="list-group">
                      {products.map(elem => {
                        return (
                          <div key={elem.id} className="list-group-item card">
                            <Link key={elem.id} to={`/products/${elem.id}`}>
                              <img
                                className="card-img-top-list"
                                src={elem.imageUrl}
                              />
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
                          </div>
                        )
                      })}
                    </div>
                  )}
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
    products: state.products.sort((a, b) => a.price - b.price),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts()),

    fetchUpdateCart: (userId, productId) =>
      dispatch(fetchUpdateCart(userId, productId)),

    fetchGuestCart: productId => dispatch(fetchGuestCart(productId)),

    sessionChecker: () => dispatch(sessionChecker()),

    auth: (email, password, method, isGuest) =>
      dispatch(auth(email, password, method, isGuest)),

    search: term => dispatch(fetchSearchedProducts(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
