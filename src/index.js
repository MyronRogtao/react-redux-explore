import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burger-builder';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

// Middleware - used to introduce side effects when a communicating with redux store
const loggingMiddleware = store => {
  return next => {
    return action => {
      console.log('[Logging Middleware]', action);
      const result = next(action);
      console.log('[Logging Middleware]', store.getState())
      return result;
    }
  }
}

const rootReducer = combineReducers({
  builder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loggingMiddleware, thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
