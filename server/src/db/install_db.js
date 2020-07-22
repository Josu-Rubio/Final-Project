'use strict';

const fs = require('fs');

const db = require('./index');
const { Product, User } = require('../models');

require('dotenv').config();

db.once('open', async () => {
  try {
    await initProduct();
    await initUser();

    db.close();
  } catch (err) {
    console.log('Unknown error:', err);
    process.exit(1);
  }
});

async function initProduct() {
  console.log('Deleting Products...');
  await Product.deleteMany();
  console.log('Creating Products...');
  await Product.insertMany([
    {
      name: 'PS4Pro',
      desc: 'Looking for a PS4 on sale',
      price: 200.99,
      type: 'buy',
      img: '/images/products/original/ps4pro.jpg',
      tags: ['lifestyle'],
    },
    {
      name: 'XBOX OneX',
      price: 170.05,
      desc: 'Selling XBOX OneX almost new',
      type: 'sell',
      img: '/images/products/original/xbox.jpg',
      tags: ['lifestyle'],
    },
    {
      name: 'Gaming Mouse',
      price: 35.5,
      desc: 'New gaming mouse on sale',
      type: 'sell',
      img: '/images/products/original/ratonmamba.jpg',
      tags: ['lifestyle', 'work', 'mobile'],
    },
  ]);
}

async function initUser() {
  console.log('Deleting Users...');
  await User.deleteMany();
  console.log('Creating User...');
  await User.insertMany([
    {
      name: 'UserExample',
      email: 'user@example.es',
      password: await User.hashSync('123456'),
    },
    {
      name: 'JosuRubio',
      email: 'josu_mr@hotmail.com',
      password: await User.hashSync('123456'),
    },
  ]);
}

// db.connect(process.env.MONGODB_URL)
//   .then(async (conn) => {
//     await Product.deleteAll();
//     await User.deleteAll();

//     const dump = JSON.parse(fs.readFileSync('./src/db/data.json', 'utf8'));

//     let id = '';
//     for (let i = 0; i < dump.users.length; i++) {
//       let user = new User(dump.users[i]);
//       user = await User.insert(user);
//       user.active = true;
//       user.token = null;
//       user.expire = null;
//       user = await user.save();
//       id = user._id;
//     }

//     const products = [];
//     for (let i = 0; i < dump.products.length; i++) {
//       const product = new Product({ ...dump.products[i] });
//       product.user = id;
//       product.thumbnail = product.img;
//       products.push(product);
//     }
//     await Product.insertAll(products);

//     console.log(
//       `Database created with ${products.length} products and ${dump.users.length} users.`
//     );
//     console.log('Please start Wallaclone with "npm start"');
//   })
//   .catch((error) => {
//     console.log('Unable to install database');
//     console.log(error);
//   });
