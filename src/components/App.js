import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import UserStatus from './UserStatus';
import '../App.css';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    tokens: state.tokens
  };
}

class App extends Component {
  render() {
    console.log('this.state', this.props.token.name)
    return (
      <div className="App">
        <Header {...this.props}></Header>
        <UserStatus {...this.props}></UserStatus>
        <Form  {...this.props}></Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
