import web3Promise from './web3_promise';
import {getToken} from './token';
import Web3 from 'web3';
const web3Util = new Web3()

function awaitEvent(event, handler) {
  return new Promise((resolve, reject) => {
    function wrappedHandler(...args) {
      Promise.resolve(handler(...args)).then(resolve).catch(reject);
    }
    event.watch(wrappedHandler);
  });
}

export async function getTokens() {
  let token = await getToken();
  let claimedEvent = token.TokenClaimed({},{fromBlock:0})
  let approvallEvent = token.Approval({},{fromBlock:0});
  let token_owners = {};
  let approvalWatcher = async function(err, result){
    approvallEvent.stopWatching();
    let original_address = result.args.spender;
    token_owners[original_address] = {
      original_address:original_address,
      claimed:false
    }
    return token_owners;
  }

  let claimedWatcher = async function(err, result){
    claimedEvent.stopWatching();
    let current_address = await token.identityToOwner(result.args.identity);
    let original_address = result.args._to;
    let identity = web3Util.toUtf8(result.args.identity);
    token_owners[original_address] = {
      claimed:true,
      identity:identity,
      current_address:current_address,
      original_address:original_address
    }
    return token_owners
  }

  await awaitEvent(approvallEvent, approvalWatcher);
  await awaitEvent(claimedEvent, claimedWatcher);
  return Object.values(token_owners);
}
