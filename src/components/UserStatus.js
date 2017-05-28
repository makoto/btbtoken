import React, { Component } from 'react';
import account from '../services/account';

let message;
class UserStatus extends Component {
  componentDidMount(){
    let self = this;
    account().then(function(address){
      self.props.changeUser({address:address});
    });
  }
  render(){
    switch (this.props.user.status) {
      case 'not_found':
        message = 'No token is issued under this address';
        break;
      case 'claimable':
        message = 'Token is issued';
        break;
      case 'claimed':
        message = 'Token is under ' + this.props.user.identity;
        break;
      default:
    }

    return(
      <p className="App-intro">
        {message}
      </p>
    )
  }
}
export default UserStatus;
