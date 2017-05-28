# BTBToken (POC for Event Token standard)

This is an extension ERC20 token which is offered to the participants of [Break The Block](http://breaktheblock.simplybusiness.co.uk) hackathon.

## Special rules for the event token

- 1 token per person
- no delimiter on the token

## Additional features

- `isTokenOwner(address)` checks if the address is the token owner.
- `ownerToIdentity(address)` returns identity of the address in bytes32 format.
- `identityToOwner(identity)` returns the address of the identity.

## How to issue and claim the event token.

Token can be given directly from issuer to the participants.
This is recommended when issuers already know the identity of the participants
these participants may not be technical enough to claim by themselves.
However this method requires the issuer (often the event organiser) to keep track of who actually attended the event. Otherwise it will hold the identity of no shows.

```
  token.give(token_owner, web3.fromUtf8(identity), {from:issuer});
```

The alternative way is that issuer issues the token which participants can claim.
The issuer can issue the token to one time address (such as http://ether.cards) which then can be transferred to any other address.
This is recommended when it's harder to keep track of all the attendance of the participants or participants prefer to use nickname of their choice.

```
  token.issue(token_owner, {from:issuer});
  token.claim(web3.fromUtf8(identity), {from:token_owner});
```

## Developer guide

### Initial setup

```npm install```

```truffle migrate```

## Utils

Run `npm run build` first to make sure that correct contract artifacts are generated under `build/contracts/`

### Issue token

`npm run -s mint -- --o issuer_address --t token_owner_address (--n name)`

- Issuer will give token if `-n` is supplied.
- Issue will issue tokens for token owner to claim if `-n` is not supplied.

### Find out who has claimed the token

`npm run -s report`

## Open questions

- Currently there is no mechanism to prevent people from having more than one token. It's relatively easy to add the constraints, but what is the pros/cons?
- Is it better to build on top of [Minime token](https://medium.com/giveth/the-minime-token-open-sourced-by-giveth-2710c0210787) so that it's easier to upgrade?

## TODO

### Front end

- claim()
- check identity is already taken or not.
- show other members.
- styling
