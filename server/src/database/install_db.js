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
      name: 'Green Card',
      desc: 'I offer a green-card',
      price: 999.99,
      type: 'sell',
      img: 'imagesproductsoriginal\2020-7-22194622__6627603.jpg',
      tags: ['lifestyle'],
    },
    {
      name: 'Iphone or something',
      price: 170.05,
      desc: 'Selling phone almost new',
      type: 'sell',
      img:
        'imagesproductsoriginal\2020-7-22225630__iphone-screen-mobile-technology-cell-hand.jpg',
      tags: ['lifestyle', 'mobile'],
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
      password: await User.hashSync(process.env.USER_PASSWORD),
    },
  ]);
}
