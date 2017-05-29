import React, { Component } from 'react'
let is_claimed;
class Tokens extends Component {
  render(){
    return(
      <table style={{margin:'auto', marginTop:'2em'}}>
        <tr>
          <th>identity</th>
          <th>address</th>
        </tr>
        {
          this.props.tokens.map(token => {
            return (
              <tr>
                <td>
                  {token.identity}
                </td>
                <td>
                  {token.current_address || token.original_address}
                </td>
              </tr>
            )
          })
        }
      </table>
    )
  }
}
export default Tokens
