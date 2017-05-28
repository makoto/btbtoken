/*
 * action types
 */

export const CLAIM_TOKEN = 'CLAIM_TOKEN';
export const CHANGE_USER = 'CHANGE_USER';

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
  console.log('changeUser', user)
  return { type: CHANGE_USER, user }
}
