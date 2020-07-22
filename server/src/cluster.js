'use strict';
const express = require('express');
const cluster = require('cluster');
const database = require('./database');
const server = require('./server');

require('dotenv').config();

if (cluster.isMaster) {
  cluster.on('listening', (worker, address) => {
    console.log(
      `Worker ${worker.id} con pid ${worker.process.pid} is now connected to port ${address.port}`
    );
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} exited with error code ${code} and signal ${signal}`
    );
    console.log('Starting a new worker...');
    cluster.fork();
  });
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  database
    .connectToMongo(process.env.MONGODB_URL)
    .then((conn) => {
      const app = server(express(), conn);

      app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });

      /**
       * For HTTPS connections
       */
      // Prepare https credentials
      //   const credentials = {
      //     key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
      //     cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8'),
      //   };
      // Start https server
      //   const appServer = https.createServer(credentials, app);
      //   appServer.listen(process.env.PORT, () => {
      //     console.log(`Server running on port ${process.env.PORT}`);
      //   });
    })
    .catch((error) => {
      console.log('Error connecting mongodb');
      console.log(error);
    });
}
