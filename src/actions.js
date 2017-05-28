/*
 * action types
 */

export const CLAIM_TOKEN = 'CLAIM_TOKEN';
export const CHANGE_USER_STATE = 'CHANGE_USER_STATE';

/*
 * other constants
 */

/*
 * action creators
 */

export function claimToken(identity) {
  return { type: CLAIM_TOKEN, identity }
}

export function changeUserState(status) {
  console.log('changeUserState', status)
  return { type: CHANGE_USER_STATE, status }
}
