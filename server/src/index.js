const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

/**
 * For connections with HTTPS
 */

// const https = require('https');
// const fs = require('fs');
// Load env variables
// require('dotenv').config();

// Prepare https credentials
// const credentials = {
//   key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
//   cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8'),
// };

// Start https server
// const appServer = https.createServer(credentials, app);
// appServer.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
