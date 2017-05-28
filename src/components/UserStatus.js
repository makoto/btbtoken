import React, { Component } from 'react';
import {address} from '../services/user';

let message;
class UserStatus extends Component {
  render(){
    switch (this.props.user.status) {
      case 'not_found':
        message = 'No token is issued under this address';
        break;
      case 'claimable':
        message = 'Token is issued waiting for you to claim';
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
