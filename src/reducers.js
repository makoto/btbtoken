const initialState = {
  accounts:[],
  user:{
    address:null,
    status:null, // (not_found|claimable|claimed),
    identity: null,
    token_address: '0x0123'
  },
  token:{
    name:null,
    symbol:null,
    address:null
  },
  tokens:[
    {
      original_address:'2',
      current_address:'12',
      identity:null,
      is_claimed:false
    }
  ]
}

function eventTokenApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return Object.assign({}, state, {
        accounts: [...state.accounts, ...action.accounts]
      })
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user)
      })
    case 'CHANGE_TOKEN':
      return Object.assign({}, state, {
        token: Object.assign({}, state.token, action.token)
      })
    default:
      return state
  }
  // For now, don't handle any actions
  // and just return the state given to us.
}

export default eventTokenApp
