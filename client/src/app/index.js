import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';

import { Provider } from 'react-redux';
import store from '../../store';

import { NavBar, Landing } from '../layout';
import { Register, Login, ForgotPassword } from '../auth';
import { ProductsList, CreateAd, UpdateAd } from '../products';
import PrivateRoute from '../private-route/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/products/list' component={ProductsList} />
          <PrivateRoute exact path='/products/create' component={CreateAd} />
          <PrivateRoute
            exact
            path='/products/update/:id'
            component={UpdateAd}
          />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
