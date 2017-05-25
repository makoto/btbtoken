import 'babel-polyfill';
var BTBToken = artifacts.require("./BTBToken.sol");

contract('BTBToken', function(accounts) {
  let token;
  beforeEach(async function(){
    token = await BTBToken.new();
  })

  it("has a name", async function() {
    assert.strictEqual(await token.name.call(), 'BreakTheBlockToken');
  })

  it("has a symbol", async function() {
    assert.strictEqual(await token.symbol.call(), 'BTB');
  })
})
