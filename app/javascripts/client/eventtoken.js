/*
  Import Dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router'
import 'babel-polyfill';

/*
  Import Components
*/
import Token from './components/Token';
// import Tokens from './components/Tokens';

/* Import our data store */
// import store, { history } from './store';

render(
  <div>hello</div>,
  // <Provider store={store}>
  //   <Router history={history}>
  //     <Route path="/" component={App}>
  //       <IndexRoute component={Token} />
  //       <Route path="/tokens" component={Tokens}></Route>
  //       <Route path="/tokens:tokenId" component={Token}></Route>
  //     </Route>
  //   </Router>
  // </Provider>,
  document.getElementById('root')
);
