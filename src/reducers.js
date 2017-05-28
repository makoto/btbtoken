import {CHANGE_USER, CHANGE_TOKEN, SET_ACCOUNTS, SET_TOKENS} from './actions';

const initialState = {
  accounts:[],
  user:{
    address:null,
    status:null, // (not_found|claimable|claimed),
    identity: null,
    token_address: null
  },
  token:{
    name:null,
    symbol:null,
    address:null
  },
  tokens:[]
}

function eventTokenApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case SET_ACCOUNTS:
      return Object.assign({}, state, {
        accounts: [...state.accounts, ...action.accounts]
      })
      case SET_TOKENS:
        return Object.assign({}, state, {
          tokens: [...state.tokens, ...action.tokens]
        })
    case CHANGE_USER:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user)
      })
    case CHANGE_TOKEN:
      return Object.assign({}, state, {
        token: Object.assign({}, state.token, action.token)
      })
    default:
      return state
  }
}

export default eventTokenApp
