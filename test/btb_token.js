import 'babel-polyfill';
var BTBToken = artifacts.require("./BTBToken.sol");

contract('BTBToken', function(accounts) {
  it("has a unit", async function() {
    let token = await BTBToken.new();
    assert.strictEqual((await token.name.call()), 'BreakTheBlockToken');
  })
})
