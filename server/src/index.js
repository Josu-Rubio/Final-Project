'use strict';
// Node imports
const https = require('https');
const fs = require('fs');

// Load env variables
require('dotenv').config();

// Create server application and start server
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`OK - HTTPS server running on port ${process.env.PORT}`);
});
