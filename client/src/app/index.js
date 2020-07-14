import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import { NavBar, Landing } from '../components/layout';
import { Register, Login } from '../components/auth';
import { ProductsList, CreateAd, UpdateAd } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route path='/products/list' exact component={ProductsList} />
          <Route path='/products/create' exact component={CreateAd} />
          <Route path='/products/update/:id' exact component={UpdateAd} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
