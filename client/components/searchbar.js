import React from 'react'
import {fetchSearchedProducts} from '../store/allProducts'
import {connect} from 'react-redux'

class searchBar extends React.Component {
  constructor() {
    super()
    this.state = {term: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({term: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('clicked yea this.state.term', this.state.term)
    console.log('clicked yea this.props', this.props)
    this.setState({term: ''})
    this.props.search(this.state.term)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="term">Search: </label>
        <input
          name="term"
          value={this.state.term}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-primary">
          {' '}
          Search{' '}
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {search: term => dispatch(fetchSearchedProducts(term))}
}

export default connect(null, mapDispatchToProps)(searchBar)
