import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import UserStatus from './UserStatus';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import {getToken, name, symbol, userStatus, ownerAddress} from '../services/token';
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
      self.props.changeToken({
        address:values[0].address,
        name:values[1],
        symbol:values[2],
        owner_address:values[3]
      });
      address().then(function(address){
        userStatus(values[3], address).then(function(status){
          self.props.changeUser({
            address:address,
            status:status
          });
        });
      });
    });
  }

  change(event) {
    this.props.changeUser({status:event.target.value});
  }
  render() {
    return (
      <div className="App">
        <Header {...this.props}></Header>
        <UserStatus {...this.props}></UserStatus>
        <Form  {...this.props}></Form>
        <select className="user-status" name="user-status" onChange={this.change.bind(this)}>
          <option value="not_found">not found</option>
          <option value="claimable">claimable</option>
          <option value="claimed">claimed</option>
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
