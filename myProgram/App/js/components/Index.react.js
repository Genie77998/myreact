import React, { Component, PropTypes } from 'react'
import * as ItemsActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContactFormEmail from './input.react'
import SubmitBtn from './submit.react'

const Index = React.createClass({
    propTypes: {
        objItem : React.PropTypes.object
    },
    getInitialState() {
        return this.props.objItem
    },
    handBlur(e){
        const actions = this.props.actions
        let value = e.target.value
        let name = e.target.name
        this.setState({name,value});
        actions.updateobj(name,value);
    },
    componentDidMount() {
    },
    submitFn(){
        console.log(this.props.history.go,this.props.history);
        //this.props.history.go('about/222')
        this.props.history.pushState(null, '/about/'+this.props.objItem.name);
    },
    render() {
        const actions = this.props.actions
        return (
          <div>
              <ContactFormEmail items={this.props.objItem} handBlur={this.handBlur} />
              <SubmitBtn defalutValue="下一步" submitFn={this.submitFn} />
          </div>
        )
    }
})

export default connect(state => ({
    objItem : state.objItem
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(Index)
