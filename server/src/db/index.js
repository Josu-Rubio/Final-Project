'use strict';

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to MongoDB in', db.name);
});

db.on('error', (err) => {
  console.error('Connection error: ', err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = db;

// const db = {
//   /**
//    * Conectar a mongo
//    */
//   connect: async (connection) => {
//     mongoose.set('useCreateIndex', true);
//     await mongoose.connect(connection, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     return mongoose.connection;
//   },
//   /**
//    * Desconectar de mongo
//    */
//   disconnect: () => {
//     mongoose.connection.close();
//   },
// };

// module.exports = db;
