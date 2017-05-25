import 'babel-polyfill';
import { default as yargs } from 'yargs';
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const BTBToken = contract(require('../build/contracts/BTBToken.json'))
let provider = new Web3.providers.HttpProvider('http://localhost:8545')
let web3 = new Web3(provider);
BTBToken.setProvider(provider);

console.log("original address \t\t\t   current address \t\t\t      identity");
let report = async function(){
  let token = await BTBToken.deployed()
  let event = token.TokenClaimed({},{fromBlock:1})
  let watcher = async function(err, result){
    event.stopWatching();
    let address = await token.identityToOwner(result.args.identity);
    console.log(result.args._to, address, web3.toUtf8(result.args.identity));
  }
  event.watch(watcher);
}

report();
