/*
 * action types
 */

export const CLAIM_TOKEN = 'CLAIM_TOKEN';
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

/*
 * other constants
 */

/*
 * action creators
 */

export function claimToken(identity) {
  return { type: CLAIM_TOKEN, identity }
}

export function changeUser(user) {
  return { type: CHANGE_USER, user }
}

export function changeToken(token) {
  return { type: CHANGE_TOKEN, token }
}
