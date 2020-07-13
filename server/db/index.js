const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://user_random:user_password@first-cluster.6oylc.mongodb.net/wallaclone?retryWrites=true&w=majority'
  )
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
