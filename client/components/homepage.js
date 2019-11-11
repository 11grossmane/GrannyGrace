import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, fetchSearchedProducts} from '../store/products'
import {fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {ProductFilter} from './product-filter'
import SearchBar from './searchbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'
import '../css/homepage.css'
import _ from 'lodash'
class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
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
  componentDidUpdate(oldProps) {
    console.log('did updadte called', oldProps)
    const newProducts = this.props.products
    if (newProducts.length && newProducts.length !== oldProps.products.length) {
      this.setState({products: newProducts})
    }
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

  filterProducts = category => {
    console.log('this.props.products', this.props.products)
    this.setState({
      products: this.props.products.filter(p => p.category === category)
    })
  }

  render() {
    const {sortValue, view, products} = this.state
    return (
      <>
        {/* APPLES BANNER IMAGE */}
        <div className="row">
          <div className="image-container">
            <img
              className="apple-banner"
              alt="apple-banner"
              src="/apples_banner.jpg"
            />
            <div className="centered">
              <span className="top-title-row">APPLES FOR ALL</span>
              <span className="bottom-title-row">
                DISTRIBUTING HIGH QUALITY APPLES NATION-WIDE
              </span>
            </div>
          </div>
        </div>

        {/* WELCOME ROW */}
        <div className="row welcome-row">
          <div className="container welcome-container">
            <h1 className="welcome">WELCOME</h1>
            <p className="description">
              Since 1979, Granny Grace’s Apple Emporium has been the #1
              distributor of apples in the Midwest. In recent years, the
              Emporium has expanded to include orchards in over 7 different
              states, delivering apples and apple bi-products to over 50,000,000
              happy customers.
            </p>
          </div>
        </div>

        {/* PRODUCT FILTER AND PRODUCTS ROW */}
        <div className="row products-row">
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
              </div>
              <div className="col-md-8 col-sm-12">
                <div id="products">
                  <div className="inner-products-container">
                    <div className="top-picks-container">
                      <span className="top-picks">Our top picks for you:</span>
                    </div>
                    <div className="container-fluid">
                      {view === 'grid' ? (
                        <div className="card-columns">
                          {products.slice(0, 9).map(elem => {
                            return (
                              <div key={elem.id} className="card">
                                <Link key={elem.id} to={`/products/${elem.id}`}>
                                  <img
                                    className="card-img-top"
                                    src={elem.imageUrl}
                                  />
                                  <div className="card-body">
                                    <h4
                                      className="card-title"
                                      style={{color: 'black'}}
                                    >
                                      {elem.name} for {elem.price}
                                    </h4>
                                    <p className="card-text">
                                      {elem.decription} - {elem.category}
                                    </p>
                                  </div>
                                </Link>
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
                            )
                          })}
                        </div>
                      ) : (
                        <div className="list-group">
                          {products.map(elem => {
                            return (
                              <div
                                key={elem.id}
                                className="list-group-item card"
                              >
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
                                    <p className="card-text">
                                      {elem.decription} - {elem.category}
                                    </p>
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
        </div>
      </>
    )
  }
}

// How the component knows about data in the store
const mapStoreToProps = store => {
  return {
    products: store.products.sort((a, b) => a.price - b.price),
    user: store.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts()),
    fetchUpdateCart: (userId, productId) =>
      dispatch(fetchUpdateCart(userId, productId)),
    sessionChecker: () => dispatch(sessionChecker()),
    auth: (email, password, method, isGuest) =>
      dispatch(auth(email, password, method, isGuest)),
    search: term => dispatch(fetchSearchedProducts(term))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts)
