import 'babel-polyfill';
import { default as yargs } from 'yargs';
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const BTBToken = contract(require('../build/contracts/BTBToken.json'))
let provider = new Web3.providers.HttpProvider('http://localhost:8545')
let web3 = new Web3(provider);
BTBToken.setProvider(provider);
let argv = yargs
    .usage('Usage: npm run -s mint -- --o contract_owner_address --m mint_address')
    // avoid address to hex conversion
    .coerce(['o', 'm'], function (arg) { return arg})
    .demandOption(['o', 'm'])
    .argv;

let mint = async function(){
  let token = await BTBToken.deployed()
  let token_name = await token.name.call();
  console.log('token_name', token_name, token.address)
  console.log(argv.o, ' is minting to', argv.m)
  await token.mint(argv.m, 1, {from:argv.o});
  let balance = await token.balanceOf.call(argv.m);
  console.log('balance', balance.toNumber());
}

// o: 0x407e8eb5ac2c0b96fcd469df9083936757c236fc
// 0xd9df04a910f979aee48b69444106fc98110be1d4
// 0x50fcdf6b3b3bed43df5c71895c02c2a74c3e3b37
// npm run -s mint -- --o "0x407e8eb5ac2c0b96fcd469df9083936757c236fc" -m '0x50fcdf6b3b3bed43df5c71895c02c2a74c3e3b37'

mint()
