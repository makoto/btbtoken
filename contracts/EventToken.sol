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
  event TokenClaimed(address indexed _to, bytes32 identity);
  mapping (address => bytes32) public ownerToIdentity;
  mapping (bytes32 => address) public identityToOwner;

  modifier canTransfer(address _sender, address _to, uint _value) {
   if (_value != unit) throw;
   if (_value > transferableTokens(_sender, uint64(now))) throw;
   _;
   var identity = ownerToIdentity[_sender];
   identityToOwner[identity] = _to;
   ownerToIdentity[_to] = identity;
   delete ownerToIdentity[_sender];
  }

  modifier onlyUnique(bytes32 identity){
    if (identity == 0x0) throw;
    if (identityToOwner[identity] != 0x0) throw;
    _;
  }

  /* this is when issuer already know the identity of the participant */
  /* and they are fine to have their real name attached to the token */
  function give(address _to, bytes32 identity) onlyOwner onlyUnique(identity) {
    mint(owner, unit);
    transfer(_to, unit);
    certify(_to, identity);
  }
  /* this is when issuer does not know the dientity of the participant  */
  /* or they prefer to use nickname */
  function issue(address _to) onlyOwner {
    mint(owner, unit);
    approve(_to, unit);
  }

  function claim(bytes32 identity) onlyUnique(identity) {
    transferFrom(owner, msg.sender, unit);
    certify(msg.sender, identity);
  }

  function certify(address _token_owner, bytes32 identity) internal {
    ownerToIdentity[_token_owner] = identity;
    identityToOwner[identity] = _token_owner;
    TokenClaimed(_token_owner, identity);
  }

  function isTokenOwner(address _token_owner) constant returns (bool) {
    return balanceOf(_token_owner) >= unit;
  }
}
