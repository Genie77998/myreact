import React from 'react'

export default class SubmitBtn extends React.Component {
  render() {
    let {defalutValue , submitFn} = this.props
    return (
      <div className="action">
          <input {...this.props} type="button" className="btn btn-next" value={defalutValue} onClick={submitFn} />
      </div>
    )
  }
}
