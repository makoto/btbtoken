import 'babel-polyfill';
import { default as yargs } from 'yargs';
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const BTBToken = contract(require('../build/contracts/BTBToken.json'))
let provider = new Web3.providers.HttpProvider('http://localhost:8545')
let web3 = new Web3(provider);
BTBToken.setProvider(provider);

console.log("original address \t\t\t   current address \t\t\t      identity");
let token_owners = {}

function awaitEvent(event, handler) {
  return new Promise((resolve, reject) => {
    function wrappedHandler(...args) {
      Promise.resolve(handler(...args)).then(resolve).catch(reject);
    }
    event.watch(wrappedHandler);
  });
}

let report = async function(){
  let token = await BTBToken.deployed()
  let claimedEvent = token.TokenClaimed({},{fromBlock:997584})
  let approvallEvent = token.Approval({},{fromBlock:997584});

  let approvalWatcher = async function(err, result){
    approvallEvent.stopWatching();
    let original_address = result.args.spender;
    // console.log('approvalWatcher', original_address)
    token_owners[original_address] = {claimed:false}
    return token_owners;
  }

  let claimedWatcher = async function(err, result){
    claimedEvent.stopWatching();
    let current_address = await token.identityToOwner(result.args.identity);
    let original_address = result.args._to;
    let identity = web3.toUtf8(result.args.identity);
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
  for (var t in token_owners) {
    console.log(t, JSON.stringify(token_owners[t]))
  }
}

report();
