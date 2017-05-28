import React, { PropTypes, Component } from 'react'
let submitButton;
class Form extends Component {
  render(){
    if (this.props.user.status == 'claimable') {
      submitButton = (<button type="button" name="button">Claim</button>)
    }

    return(
      <form className="claim">
        <input style={{width: '350px'}} type="text" name="token_owner_address" value={this.props.user.address}></input>
        {submitButton}
      </form>
    )
  }
}
export default Form
