'use strict';

const https = require('https');

const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
