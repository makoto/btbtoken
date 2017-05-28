import web3Promise from './web3_promise';
import {userStatus, ownerToIdentity} from '../services/token';

export function address() {
  return new Promise(function(resolve, reject){
    web3Promise().then(function(promise){
      return promise.web3.eth.getAccounts(function(error, accounts) {
        resolve(accounts[0])
      })
    })
  })
}

export async function getUser(user_address, owner_address){
  console.log('getUser', user_address, owner_address)
  let status = await userStatus(owner_address, user_address);
  let identity = await ownerToIdentity(user_address);
  return({
    address:user_address,
    identity:identity,
    status:status
  })
}
