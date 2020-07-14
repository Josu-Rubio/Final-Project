import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './i18next';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
