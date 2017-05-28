/*
 * action types
 */

export const CLAIM_TOKEN = 'CLAIM_TOKEN'

/*
 * other constants
 */

/*
 * action creators
 */

export function claimToken(identity) {
  return { type: CLAIM_TOKEN, identity }
}
