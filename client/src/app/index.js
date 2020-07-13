import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { ProductsList, ProductsInsert, ProductsUpdate } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/products/list' exact component={ProductsList} />
        <Route path='/products/create' exact component={ProductsInsert} />
        <Route path='/products/update/:id' exact component={ProductsUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
