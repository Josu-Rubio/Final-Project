'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const db = {
  connect: async (connection) => {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(connection, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    return mongoose.connection;
  },

  disconnect: () => {
    mongoose.connection.close();
  },
};

module.exports = db;
