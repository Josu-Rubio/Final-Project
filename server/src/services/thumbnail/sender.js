'use strict';

const connectionPromise = require('../connect');

const queueName = 'thumbnails';
let connected = false;
let channel = null;

main().catch((error) =>
  console.log('Error while connecting to rabbitmq', error)
);

async function main() {
  const connection = await connectionPromise;
  channel = await connection.createChannel();
  await channel.assertQueue(queueName, {
    durable: true,
  });
  connected = true;
}

module.exports = (img, id) => {
  if (connected) {
    const message = {
      id: id,
      img: img,
    };
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Work to create ${img} thumbnail sent to queue`);
  } else {
    console.log('Error: connection to RabbitMQ not started');
  }
};
