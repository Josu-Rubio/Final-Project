// NPM Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* Containers */
import Catalog from '../Catalog';
import ProductDetail from '../ProductDetail';
import ProductEdit from '../ProductEdit';
import Login from '../Login';
import Register from '../Register';
import Remember from '../Remember';
import Reset from '../Reset';
import Profile from '../Profile';
import Home from '../Home';
// Components
import ErrorBoundary from '../ErrorBoundary';
import PrivateRoute from '../PrivateRoute';
import Error404 from '../Error404';
// Models
// Own modules
// Assets
// CSS

/**
 * Main App
 */
export default function App(props) {
  /**
   * Render
   */
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/remember' exact component={Remember} />
          <Route path='/reset/:token' exact component={Reset} />
          <Route path='/activate/:token' exact component={Login} />
          <PrivateRoute path='/catalog' exact component={Catalog} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <PrivateRoute
            path='/product/display/:slug'
            exact
            component={ProductDetail}
          />
          <PrivateRoute
            path='/product/create'
            exact
            render={(props) => <ProductEdit {...props} mode='create' />}
          />
          <PrivateRoute
            path='/product/edit/:slug'
            exact
            render={(props) => <ProductEdit {...props} mode='edit' />}
          />
          <PrivateRoute path='/' exact component={Home} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
