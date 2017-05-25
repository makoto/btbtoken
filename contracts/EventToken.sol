pragma solidity ^0.4.8;

import './zeppelin/token/MintableToken.sol';
import './zeppelin/token/LimitedTransferToken.sol';

/**
 * Event token
 *
 * Based on code by Devcon2 token
 * http://github.com/pipermerriam/devcon2-token
 *
 * Additoinal rule
 * - You can only transfer 1 unit at a time (to avoid shared proof);
 *
 */

contract EventToken is MintableToken, LimitedTransferToken {
  uint public constant unit = 1;
  uint public constant decimals = 0;

  modifier canTransfer(address _sender, uint _value) {
   if (_value != unit) throw;
   if (_value > transferableTokens(_sender, uint64(now))) throw;
   _;
  }

  function isTokenOwner(address _owner) constant returns (bool) {
    return balanceOf(_owner) >= unit;
  }
}
