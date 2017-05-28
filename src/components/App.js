import React, { Component } from 'react';
import Header from './Header'
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
        <p className="App-intro">
          hello
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
