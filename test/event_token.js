require('babel-polyfill');
const EventToken = artifacts.require("./EventToken.sol");
let token, issuer, ether_card, participant_wallet, identity;

contract('EventToken', function(accounts) {
  beforeEach(async function(){
    token = await EventToken.new();
    issuer = accounts[0];
    ether_card = accounts[1];
    participant_wallet = accounts[2];
    identity = 'makoto';
  })

  it("has a unit", async function() {
    assert.strictEqual((await token.unit.call()).toNumber(), 1);
  })

  it("has a decimal", async function() {
    assert.strictEqual((await token.decimals.call()).toNumber(), 0);
  })

  it("issuer can give token with identity", async function(){
    await token.give(ether_card, web3.fromUtf8(identity), {from:issuer});
    assert.strictEqual(await token.isTokenOwner.call(ether_card), true);
    assert.strictEqual(web3.toUtf8(await token.ownerToIdentity.call(ether_card)), identity);
    assert.strictEqual(await token.identityToOwner.call(web3.fromUtf8(identity)), ether_card);
  })

  it("token owner can claim the issued token with identity", async function(){
    await token.issue(ether_card, {from:issuer});
    await token.claim(web3.fromUtf8(identity), {from:ether_card});
    assert.strictEqual(await token.isTokenOwner.call(ether_card), true);
    assert.strictEqual(web3.toUtf8(await token.ownerToIdentity.call(ether_card)), identity);
  })

  it("can transfer identity", async function(){
    await token.issue(ether_card, {from:issuer});
    await token.claim(web3.fromUtf8(identity), {from:ether_card});
    assert.strictEqual(await token.isTokenOwner.call(ether_card), true);
    assert.strictEqual(web3.toUtf8(await token.ownerToIdentity.call(ether_card)), identity);

    await token.transfer(participant_wallet, 1, {from:ether_card});
    assert.strictEqual(await token.isTokenOwner.call(participant_wallet), true);
    assert.strictEqual(web3.toUtf8(await token.ownerToIdentity.call(participant_wallet)), identity);
    assert.strictEqual(await token.identityToOwner.call(web3.fromUtf8(identity)), participant_wallet);
  })

  it("cannot claim the same identity", async function(){
    await token.issue(ether_card, {from:issuer});
    await token.claim(web3.fromUtf8(identity), {from:ether_card});
    await token.issue(participant_wallet, {from:issuer});
    await token.claim(web3.fromUtf8(identity), {from:participant_wallet}).catch(function(){});
    assert.strictEqual(await token.isTokenOwner.call(participant_wallet), false);
    assert.strictEqual(web3.toUtf8(await token.ownerToIdentity.call(participant_wallet)), '');
    assert.strictEqual(await token.identityToOwner.call(web3.fromUtf8(identity)), ether_card);
  })

  // it("cannot transfer to existing owner")
})
