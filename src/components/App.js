import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import UserStatus from './UserStatus';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import {getToken, name, symbol, userStatus, ownerAddress, ownerToIdentity} from '../services/token';
import {address} from '../services/user';

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    tokens: state.tokens
  };
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class App extends Component {
  componentDidMount(){
    let self = this;
    Promise.all([getToken(), name(), symbol(), ownerAddress()]).then(values => {
      let status, owner_address, user_address;
      owner_address = values[0].address;
      self.props.changeToken({
        address:owner_address,
        name:values[1],
        symbol:values[2],
        owner_address:values[3]
      });
      address().then(function(_a){
        user_address = _a
        return userStatus(values[3], user_address)
      })
      .then(function(s){
        status = s;
        return ownerToIdentity(user_address)
      })
      .then(function(identity){
        self.props.changeUser({
          address:user_address,
          identity:identity,
          status:status
        });
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Header {...this.props}></Header>
        <UserStatus {...this.props}></UserStatus>
        <Form  {...this.props}></Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
