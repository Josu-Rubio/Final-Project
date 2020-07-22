import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './components/App';

import { configureStore } from './store/index';
import LocalStorage from './utils/Storage';
import { loginWithToken } from './store/actions';

import './index.css';

const store = configureStore();

let session = LocalStorage.readLocalStorage();
if (session && session.jwt) {
  store.dispatch(loginWithToken(session.jwt));
}

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
