/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/curProduct'
// import './update-single-product.css'

const UpdateSingleProduct = class extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      quantity: '',
      imageUrl: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    console.log('bout to mount')
    if (prevProps.curProduct.name !== this.props.curProduct.name) {
      this.setState({
        name: this.props.curProduct.name,
        price: this.props.curProduct.price,
        imageUrl: this.props.curProduct.imageUrl,
        description: this.props.curProduct.description,
        quantity: this.props.curProduct.quantity
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const curProduct = this.props.curProduct

    const newProduct = {
      name: this.state.name || curProduct.name,
      price: this.state.price || curProduct.price,
      imageUrl: this.state.imageUrl || curProduct.imageUrl
    }

    this.props.updateProduct(curProduct.id, newProduct)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <div className="update-form-container">
        <h4 className="update-title">Update This Product</h4>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity: </label>
            <input
              name="quantity"
              type="text"
              value={this.state.quantity}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image Url: </label>
            <input
              name="imageUrl"
              type="text"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>

          <br />
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(({curProduct, products}) => ({curProduct, products}), {
  updateProduct
})(UpdateSingleProduct)
