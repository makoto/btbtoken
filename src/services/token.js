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

export async function ownerToIdentity(address) {
  console.log('ownerToIdentity1', address)
  if (address) {
    let t = await getToken()
    let hex = await t.ownerToIdentity.call(address);
    console.log('ownerToIdentity2', hex)
    return web3Util.toUtf8(hex);
  }else{
    console.log('ownerToIdentity3')
    return null;
  }
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
    web3Promise().then(function(promise, provider, readOnly, networkId){
      console.log('promise', 'provider, readOnly, networkId', promise, provider, readOnly, networkId)
      Token.setProvider(promise.provider);
      Token.setNetwork(3);
      Token.deployed().then(function(t){
        resolve(t)
      })
    })
  })
}

export async function claim(address, identity){
  let token = await getToken()
  // It gets out of gas event at 100k. Is this too expensive?
  return await token.claim(web3Util.fromUtf8(identity), {from:address, gas:300000});
}
