import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import eventTokenApp from './reducers'
import { claimToken } from './actions'

let store = createStore(
  eventTokenApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App>
      <Header {...this.props}></Header>
      <p className="App-intro">
        hello
      </p>
    </App>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
