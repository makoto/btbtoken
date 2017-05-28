import web3 from './web3';

export function address() {
  return new Promise(function(resolve, reject){
    web3().then(function(web3Promise){
      return web3Promise.web3.eth.getAccounts(function(error, accounts) {
        resolve(accounts[0])
      })
    })
  })
}
