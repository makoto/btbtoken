import React, { Component } from 'react'
let is_claimed;
class Tokens extends Component {
  render(){
    return(
      <table>
        <th>
          <td>identity</td>
          <td>address</td>
        </th>
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
