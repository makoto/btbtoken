

export function claim(identity, token_owner_address) {
  return {
    type: 'CLAIM_TOKEN',
    identity,
    token_owner_address,
  };
}
