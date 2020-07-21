'use strict';

const fs = require('fs');

const db = require('./src/db');
const { Product, User } = require('./src/models');

require('dotenv').config();

db.connect(process.env.MONGODB_URL)
  .then(async (conn) => {
    await Product.deleteAll();
    await User.deleteAll();

    const dump = JSON.parse(
      fs.readFileSync('./src/database/data.json', 'utf8')
    );

    let id = '';
    for (let i = 0; i < dump.users.length; i++) {
      let user = new User(dump.users[i]);
      user = await User.insert(user);
      user.active = true;
      user.token = null;
      user.expire = null;
      user = await user.save();
      id = user._id;
    }

    const products = [];
    for (let i = 0; i < dump.anuncios.length; i++) {
      const product = new Product({ ...dump.anuncios[i] });
      product.user = id;
      product.thumbnail = product.img;
      products.push(product);
    }
    await Product.insertAll(products);

    console.log(
      `Database created with ${products.length} products and ${dump.users.length} users.`
    );
    console.log('Please start Wallaclone with "npm start"');
  })
  .catch((error) => {
    console.log('Unable to install database');
    console.log(error);
  });
