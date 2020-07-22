'use strict';

var app = require('./app');
var debug = require('debug')('nodeapi:server');
var http = require('http');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();

if (cluster.isMaster) {
  const numCpus = os.cpus().length;
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('listening', (worker, address) => {
    console.log(
      `Worker ${worker.id} with pid ${worker.process.pid} connected to port ${address.port}`
    );
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.id} with pid ${worker.process.pid} finished with code ${code} and signal ${signal}`
    );
  });
} else {
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  var server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
