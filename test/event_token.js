require('babel-polyfill');
var EventToken = artifacts.require("./EventToken.sol");

contract('EventToken', function(accounts) {
  it("has a unit", async function() {
    let token = await EventToken.new();
    assert.strictEqual((await token.unit.call()).toNumber(), 1);
  })
  it("can mint by owner", async function() {
    let token = await EventToken.new();
    await token.mint(accounts[1], 1);
    assert.strictEqual((await token.balanceOf.call(accounts[1])).toNumber(), 1);
    assert.strictEqual((await token.isTokenOwner.call(accounts[1])), true);
  })
})
