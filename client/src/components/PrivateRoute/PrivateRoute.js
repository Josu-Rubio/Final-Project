import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ ...props }) =>
  props.session.email ? <Route {...props} /> : <Redirect to='/login' />;

export default PrivateRoute;
