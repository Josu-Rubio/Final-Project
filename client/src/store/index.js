// Node imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';

const loggerMiddleware = createLogger();
const componseEnhancers = composeWithDevTools;

/**
 * Store config
 */
export function configureStore(preloadedState) {
  const reducer = combineReducers(reducers);
  const middlewares = [thunkMiddleware];
  if (process.env === 'development') {
    middlewares.push(loggerMiddleware);
  }
  const store = createStore(
    reducer,
    preloadedState,
    componseEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}
