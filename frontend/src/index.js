import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import createSageMiddleware from 'redux-saga'
import './index.css';
import App from './App';

import IndexReducer from './index-reducer';
import IndexSagas from './index-saga';

const sagaMiddleware = createSageMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/*eslint-enable */

export const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

