import React, { Component, PropTypes } from 'react'
import * as ItemsActions from '../actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cityList from '../com/city-list'
const About = React.createClass({
  render () {
  	const userId = this.props.params.userId
    console.log(this.props);
    return (
      <div>
          <Link to="inbox">
            <span className="glyphicon glyphicon-home " aria-hidden="true"> id:{userId} </span>
          </Link>  
      </div>
    )
  }
})

export default connect(state => ({
    objItem : state.objItem
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(About)

