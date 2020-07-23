'use strict';

var Jimp = require('jimp');

const connectionPromise = require('../connect');
const { Product } = require('../../models');
const db = require('../../database');

const queueName = 'thumbnails';

main().catch((error) =>
  console.log('Error while connecting to rabbitmq', error)
);

async function main() {
  await db.connect(process.env.MONGODB_URL);
  console.log('Connected to mongodb...');

  const connection = await connectionPromise;
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });
  channel.prefetch(2);
  console.log('Subscribed to queue...');

  channel.consume(queueName, (msg) => {
    const message = JSON.parse(msg.content.toString());
    console.log(message);
    let thumbnail = message.img;
    thumbnail = thumbnail.replace('/original/', '/thumbnail/');
    Jimp.read(`public${message.img}`)
      .then((image) => {
        image.resize(100, 100).quality(60).write(`public${thumbnail}`);
        console.log(`Thumbnail generated: ${thumbnail}`);
        channel.ack(msg);
        Product.updateProduct(
          message.id,
          new Product({ thumbnail: thumbnail })
        ).then((result) => {
          console.log(`Product ${result._id} updated: ${result.thumbnail}`);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
