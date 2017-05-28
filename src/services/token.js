import web3Promise from './web3_promise';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'
import artifacts from '../contracts/BTBToken.json'

// ownerToIdentity.call(ether_card)
//
var Token  = TruffleContract(artifacts);
const web3Util = new Web3()
export function name() {
  return getToken().then(function(t){
    return t.name.call()
  })
}

export function symbol() {
  return getToken().then(function(t){
    return t.symbol.call()
  })
}

export function ownerAddress() {
  return getToken().then(function(t){
    return t.owner.call()
  })
}


export function isTokenOwner(address) {
  return getToken().then(function(t){
    return t.isTokenOwner.call(address)
  })
}

export function ownerToIdentity(address) {
  return getToken().then(function(t){
    return t.ownerToIdentity.call(address)
  })
}

export function identityToOwner(identity) {
  return getToken().then(function(t){
    return t.identityToOwner.call(web3Util.fromUtf8(identity))
  })
}

export function allowance(owner, spender){
  return getToken().then(function(t){
    return t.allowance.call(owner, spender)
  })
}

export async function userStatus(owner, spender){
  let _identity = await ownerToIdentity(spender)
  let _allowance = await allowance(owner, spender)
  console.log('aaa', _identity, _allowance.toNumber())
  if(_identity != 0x0){
    return 'claimed';
  }else{
    if (_allowance.toNumber() == 0) {
      return 'not_found'
    }else{
      return 'claimable'
    }
  }
}

export function getToken() {
  return new Promise(function(resolve, reject){
    web3Promise().then(function(promise){
      Token.setProvider(promise.provider);
      Token.deployed().then(function(t){
        console.log('tokenaddress', t.address)
        resolve(t)
      })
    })
  })
}

export function claim(address, identity){
  return getToken().then(function(t){
    console.log('claim3', web3Util.fromUtf8(identity), identity, {from:address})
    return t.claim(web3Util.fromUtf8(identity), {from:address});
  })
}
