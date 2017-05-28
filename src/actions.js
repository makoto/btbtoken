/*
 * action types
 */

export const CLAIM_TOKEN = 'CLAIM_TOKEN';
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const SET_TOKENS = 'SET_TOKENS';

/*
 * other constants
 */

/*
 * action creators
 */

export function claimToken(identity) {
  return { type: CLAIM_TOKEN, identity }
}

export function setAccounts(accounts) {
  return { type: SET_ACCOUNTS, accounts }
}

export function setTokens(tokens) {
  return { type: SET_TOKENS, tokens }
}

export function changeUser(user) {
  return { type: CHANGE_USER, user }
}

export function changeToken(token) {
  return { type: CHANGE_TOKEN, token }
}
