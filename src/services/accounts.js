import web3Promise from './web3_promise';

export function getAccounts() {
  return new Promise(function(resolve, reject){
    web3Promise().then(function(promise){
      return promise.web3.eth.getAccounts(function(error, accounts) {
        resolve(accounts)
      })
    })
  })
}
