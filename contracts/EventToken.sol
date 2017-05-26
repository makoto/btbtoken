pragma solidity ^0.4.8;
/// @title Event token
/// @author Makoto Inoue
/*
 * Based on code by Devcon2 token
 * http://github.com/pipermerriam/devcon2-token
 *
 * The Token is mostly inherited from OpenZeppelin
 * https://github.com/OpenZeppelin/zeppelin-solidity
 *
 */
import './zeppelin/token/MintableToken.sol';
import './zeppelin/token/LimitedTransferToken.sol';

contract EventToken is MintableToken, LimitedTransferToken {
  /// @notice 1 token per 1 participant of the event will be issued
  uint public constant unit = 1;
  /// @notice No delimiter
  uint public constant decimals = 0;
  /// @dev use the event to find out all the token owners identities
  event TokenClaimed(address indexed _to, bytes32 identity);
  /// @notice ownerToIdentity(address)
  mapping (address => bytes32) public ownerToIdentity;
  /// @notice identityToOwner(identity)
  mapping (bytes32 => address) public identityToOwner;

  /// @dev added _to the original canTransfer modifier
  /// @param address of the sender
  /// @param address of the receiver
  /// @param amount to send
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

  /// @dev this is when issuer already know the identity of the participant
  /// @dev and they are fine to have their real name attached to the token
  /// @param the address of the token owner
  /// @param the unique name of the token owner (eg: Makoto) in bytes32 format
  function give(address _to, bytes32 identity) onlyOwner onlyUnique(identity) {
    mint(owner, unit);
    transfer(_to, unit);
    certify(_to, identity);
  }

  /// @dev this is when issuer does not know the dientity of the participant
  /// @dev or they prefer to use nickname */
  /// @param the address of the token owner
  function issue(address _to) onlyOwner {
    mint(owner, unit);
    approve(_to, unit);
  }

  /// @param the unique name of the token owner (eg: Makoto) in bytes32 format
  function claim(bytes32 identity) onlyUnique(identity) {
    transferFrom(owner, msg.sender, unit);
    certify(msg.sender, identity);
  }

  /// @param the address of the token owner
  /// @param the unique name of the token owner (eg: Makoto) in bytes32 format
  function certify(address _token_owner, bytes32 identity) internal {
    ownerToIdentity[_token_owner] = identity;
    identityToOwner[identity] = _token_owner;
    TokenClaimed(_token_owner, identity);
  }

  /// @dev this will show true even if user directly transfer the token without using certify
  /// @param the address of the token owner
  function isTokenOwner(address _token_owner) constant returns (bool) {
    return balanceOf(_token_owner) >= unit;
  }
}
