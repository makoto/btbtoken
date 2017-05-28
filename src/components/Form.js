import React, { Component } from 'react';
import {claim} from '../services/token';
import {getUser} from '../services/user';
let submitForm;
class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      identity: null
    };
  }

  select(event){
    getUser(event.target.value, this.props.token.owner_address).then((user) =>{
      this.props.changeUser(user)
    })
  }

  change(event){
    this.setState({identity:event.target.value})
  }

  submit(event){
    event.preventDefault()
    claim(this.props.user.address, this.state.identity);
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
        <select value={this.props.user.address} onChange={this.select.bind(this)}>
          {
            this.props.accounts.map(account => {
              return (<option value={account} >{account}</option>)
            })
          }
        </select>
        <br/>
        {submitForm}
      </div>
    )
  }
}
export default Form
