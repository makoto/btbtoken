import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import UserStatus from './UserStatus';
import Tokens from './Tokens';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import {getToken, name, symbol, ownerAddress} from '../services/token';
import {address, getUser} from '../services/user';
import {getAccounts} from '../services/accounts';
import {getTokens} from '../services/tokens';

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    tokens: state.tokens,
    accounts: state.accounts
  };
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class App extends Component {
  componentDidMount(){
    Promise.all([getToken(), name(), symbol(), ownerAddress()]).then(values => {
      let status, owner_address, user_address, token_address;
      token_address = values[0].address;
      owner_address = values[3];
      this.props.changeToken({
        address:token_address,
        name:values[1],
        symbol:values[2],
        owner_address:owner_address
      });
      getAccounts().then(accunts => {
        this.props.setAccounts(accunts)
        getUser(accunts[0], owner_address).then((user) => {
          this.props.changeUser(user)
        })
      })
      getTokens(token => {
        this.props.addToken(token)
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Header {...this.props}></Header>
        <h3>Your token</h3>
        <UserStatus {...this.props}></UserStatus>
        <Form {...this.props}></Form>
        <h3>People who claimed their token</h3>
        <Tokens {...this.props}></Tokens>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
