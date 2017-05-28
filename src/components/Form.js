import React, { PropTypes, Component } from 'react'
import {claim} from '../services/token';
let submitForm;
class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      identity: null
    };
  }

  change(event){
    this.setState({identity:event.target.value})
  }

  submit(event){
    event.preventDefault()
    let transaction = claim(this.props.user.address, this.state.identity);
  }
  render(){
    if (this.props.user.status == 'claimable') {
      submitForm = (
        <form className="claim" onSubmit={this.submit.bind(this)}>
          <input onChange={this.change.bind(this)}
            style={{width: '350px'}} type="text"
            name="identity" value={this.state.identity}
          />
          <button>Claim</button>
        </form>
      )
    }else{
      submitForm = null;
    }
    return(
      <div>
        <input
          style={{width: '350px'}} type="text"
          name="token_owner_address" value={this.props.user.address}
        ></input>
        {submitForm}
      </div>
    )
  }
}
export default Form
