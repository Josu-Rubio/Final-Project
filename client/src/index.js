// import React, { Suspense } from 'react';
// import ReactDOM from 'react-dom';
// import App from './app';

// ReactDOM.render(
//   <Suspense fallback={<div>Loading...</div>}>
//     <App />
//   </Suspense>,
//   document.getElementById('root')
// );

// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
// Material UI
// Components
import App from './components/App';
// Own modules
import { configureStore } from './store/index';
import LocalStorage from './utils/Storage';
import { loginWithToken } from './store/actions';
// Assets
// CSS
// import './index.css';

// Store de redux
const store = configureStore();

// Intento recuperar la sesión del storage, y si existe trato de hacer login con el token
let session = LocalStorage.readLocalStorage();
if (session && session.jwt) {
  store.dispatch(loginWithToken(session.jwt));
}

// Render
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
