'use strict';

const amqplib = require('amqplib');

require('dotenv').config();

const connection = amqplib.connect(process.env.RABBITMQ_URL);

module.exports = connection;
