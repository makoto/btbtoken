const initialState = {
  addresses:[1,2,3],
  user:{
    address:1,
    status:'not_found', // (not_found|claimable|claimed),
    identity: 'Makoto',
    token_address: '0x0123'
  },
  token:{
    name:'BreakTheBlockToken',
    symbol:'BTB'
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
  console.log('action', action)
  console.log('state', state)
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user)
      })
    default:
      return state
  }
  // For now, don't handle any actions
  // and just return the state given to us.
}

export default eventTokenApp
