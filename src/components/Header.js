import React, { PropTypes, Component } from 'react'
// import logo from './logo.svg';
let logo = 'http://breaktheblock.simplybusiness.co.uk/assets/img/logo-m.png';
class Header extends Component {
  render(){
    console.log('this', this.props.token.name)
    return(
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to {this.props.token.name}({this.props.token.symbol}) page</h2>
      </div>
    )
  }
}
export default Header
