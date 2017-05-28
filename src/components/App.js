import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import UserStatus from './UserStatus';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

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
  change(event) {
    this.props.changeUserState(event.target.value);
  }
  render() {
    console.log('this.state', this.props)
    return (
      <div className="App">
        <Header {...this.props}></Header>
        <UserStatus {...this.props}></UserStatus>
        <Form  {...this.props}></Form>
        <select class="" name="" onChange={this.change.bind(this)}>
          <option value="not_found">not found</option>
          <option value="claimable">claimable</option>
          <option value="claimed">claimed</option>
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
