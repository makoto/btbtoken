import React, { Component } from 'react';
import {claim} from '../services/token';
import {getUser} from '../services/user';
let submitForm, infoBox;
class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      identity: null,
      in_progress: false,
      block_hash: null
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
    claim(this.props.user.address, this.state.identity).then(trx => {
      this.setState({
        in_progress:true,
        block_hash: trx.receipt.blockHash
      })
    })
  }
  render(){
    if (this.state.in_progress){
      infoBox = (
        <div style={{color: '#FBBC05', width:'50%', margin:'auto', padding:'2em'}}>
          Waiting to get confirmation.
        </div>
      )
    }
    if (this.props.user.status == 'claimable' && !this.state.in_progress) {
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
        {infoBox}
      </div>
    )
  }
}
export default Form
