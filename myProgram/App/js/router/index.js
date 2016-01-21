import React from 'react'
import Inbox from '../components/Inbox.react'
import About from '../components/About.react'
import Index from '../components/Index.react'
const App = React.createClass({
    render() {
        return (
          <div className="container">
                {this.props.children}
          </div>
        )
    }
})
const routes = {
  path: '/',
  component: App,
  indexRoute : {component: Index},
  childRoutes: [
  	{ path: 'index' , component: Index},
    { path: 'inbox' , component: Inbox},
    { path: 'about/:userId' , component: About }
  ]
}
export default routes
