import React, { Component, PropTypes } from 'react'
import { common } from '../com/unilt'
import * as ItemsActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContactForm from './input.react'
import SubmitBtn from './submit.react'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
const Index = React.createClass({
    propTypes: {
        objItem : React.PropTypes.object
    },
    getInitialState() {
        return {
            name : this.props.objItem.name || '',
            age : this.props.objItem.age || '',
            sex : this.props.objItem.sex || '',
            email : this.props.objItem.email || '',
            mobile : this.props.objItem.mobile || ''
        }
    },
    handBlur(e){
        const actions = this.props.actions
        let value = e.target.value
        let name = e.target.name
        let _obj = {}
        _obj[name] = value
        this.setState(_obj);
        actions.updateobj(name,value);
    },
    componentDidMount() {
    },
    submitFn(){
        let _status = common.validate(this.state)
        if(!_status){
            return;
        }
        this.props.history.push('/about/'+this.props.objItem.name)
    },
    render() {
        const actions = this.props.actions
        return (
          <div>
                <from ref="registerFrom">
                    <ContactForm items={this.props.objItem} handBlur={this.handBlur} />
                </from>
              <SubmitBtn defalutValue="下一步" data-sss="aa" data-aa="sfsafsaf" data-bb="sfsff" submitFn={this.submitFn} />
          </div>
        )
    }
})

export default connect(state => ({
    objItem : state.objItem
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(Index)


