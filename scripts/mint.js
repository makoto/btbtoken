import 'babel-polyfill';
import { default as yargs } from 'yargs';
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const BTBToken = contract(require('../build/contracts/BTBToken.json'))
let provider = new Web3.providers.HttpProvider('http://localhost:8545')
let web3 = new Web3(provider);
BTBToken.setProvider(provider);
let argv = yargs
    .usage('Usage: npm run -s mint -- --o issuer_address --t token_owner_address --n name')
    // avoid address to hex conversion
    .coerce(['o', 't'], function (arg) { return arg})
    .demandOption(['o', 't'])
    .argv;

let mint = async function(){
  let token = await BTBToken.deployed()
  let token_name = await token.name.call();
  console.log('token_name', token_name, token.address)
  let transaction;
  if (argv.n) {
    console.log(argv.o, ' is giving an event token to', argv.t, ' with identity ', argv.n)
    transaction = await token.give(argv.t, web3.fromUtf8(argv.n), 1, {from:argv.o, gas:200000});
  }else{
    console.log(argv.o, ' is issuing an event token to', argv.t, ' to claim');
    transaction = await token.issue(argv.t, 1, {from:argv.o, gas:200000});
  }

  console.log('transaction', transaction.tx, ' used ',  transaction.receipt.gasUsed, 'gas');
  let balance = await token.balanceOf.call(argv.t);
  console.log('balance', balance.toNumber());
}

// o: 0x407e8eb5ac2c0b96fcd469df9083936757c236fc
// 0xd9df04a910f979aee48b69444106fc98110be1d4
// 0x50fcdf6b3b3bed43df5c71895c02c2a74c3e3b37
// npm run -s mint -- --o "0x407e8eb5ac2c0b96fcd469df9083936757c236fc" -m '0x50fcdf6b3b3bed43df5c71895c02c2a74c3e3b37'

mint()
