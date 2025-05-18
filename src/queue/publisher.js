const amqp = require('amqplib');
require('dotenv').config();

let channel;

(async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URI);
  channel = await connection.createChannel();
  await channel.assertQueue('notifications');
})();

exports.publishToQueue = (queue, msg) => {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
};
