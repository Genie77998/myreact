import React from 'react'


class InputList extends React.Component {

  render() {
    return (
      <dd className="itemInput">
        <div className="key">{this.serach(this.props.defalutName)}</div>
        <div className="value">
            <input type="text" onChange={this.props.handBlur.bind(this)} name={this.props.defalutName} defaultValue={this.props.defalutValue} ref={this.props.defalutName} />
        </div>
        </dd>
    )
  }

  serach(name){
    switch(name){
      case 'name':
        return '姓名';
      break;
      case 'age':
        return '年龄';
      break;
      case 'sex':
        return '性别';
      break;
      case 'email':
        return '邮箱';
      break;
      default:
      return '手机';
    }
  }
}

class ContactFormEmail extends React.Component {
  render() {
    const { items , handBlur} = this.props
    const elements = ['name','age','sex','email','mobile']
    return (
      <dl className="bgWhite items">
          {_.map(elements, function(num){ 
            return <InputList handBlur={handBlur} key={num} defalutValue={items[num]} defalutName={num}/>
          })}
      </dl>
    )
  }
}

export default ContactFormEmail
