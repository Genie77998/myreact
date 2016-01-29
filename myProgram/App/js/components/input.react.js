import React from 'react'


class InputList extends React.Component {

  render() {
    const _defalutName = this.props.defalutName
    const _defalutValue = this.props.defalutValue
    const _defalutNameCN = this.serach(_defalutName)
    return (
      <dd className="itemInput">
        <div className="key">{_defalutNameCN}</div>
        <div className="value">
            <input type="text" className="ar" data-rule={this.rule(_defalutName)} data-require="true" data-null={"请填写您的"+_defalutNameCN} data-error={_defalutNameCN+'格式有误'} onBlur={this.props.handBlur} placeholder={"请填写您的"+_defalutNameCN} name={_defalutName} defaultValue={_defalutValue} />
        </div>
        </dd>
    )
  }
  
  rule(name){
    switch(name){
      case 'name':
        return 'idCardNameReg'
      break;
      case 'mobile':
        return 'phoneReg'
      break;
      case 'email':
        return 'emailReg'
      break;
      default: return '';
    }
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
