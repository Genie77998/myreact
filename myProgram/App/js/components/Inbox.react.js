import React from 'react'
import { Link } from 'react-router'
const Inbox = React.createClass({
  render () {
    return (
      <div>
          <Link to="/">
            <span className="glyphicon glyphicon-home " aria-hidden="true"> 首页 </span>
          </Link> 
      </div>
    )
  }
})

export default Inbox
