import web3Promise from './web3_promise';
import {getToken} from './token';
import Web3 from 'web3';
const web3Util = new Web3()

export function getTokens(callback) {
  getToken().then(t => {
    return t.TokenClaimed({},{fromBlock:0})
  }).then(event => {
    return event.watch((err,result) =>{
      // let current_address = await t.identityToOwner(result.args.identity);
      let original_address = result.args._to;
      let identity = web3Util.toUtf8(result.args.identity);
      let token = {
        claimed:true,
        identity:identity,
        // current_address:current_address,
        original_address:original_address
      }
      callback(token);
    });
  })
}
