const amqp = require('amqplib');
const mongoose = require('mongoose');
const Notification = require('../src/models/Notification');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const connection = await amqp.connect(process.env.RABBITMQ_URI);
  const channel = await connection.createChannel();
  await channel.assertQueue('notifications');

  console.log('Worker waiting for messages...');

  channel.consume('notifications', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('Processing:', data);

    try {
      if (data.type === 'in-app') {
        await Notification.create({
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: 'in-app'
        });
      }
      // Add email/SMS handling here
      channel.ack(msg);
    } catch (err) {
      console.error('Error:', err);
      channel.nack(msg, false, true);  // Retry
    }
  });
})();
