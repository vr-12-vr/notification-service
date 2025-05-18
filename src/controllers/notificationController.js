const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message, email } = req.body;

    // Basic validation for required fields
    if (!userId || !type || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Save notification to MongoDB
    const notification = new Notification({ userId, type, message });
    await notification.save();

    // Handle email notification
    if (type === 'email') {
      if (!email) {
        return res.status(400).json({ success: false, message: "Missing email for email notification" });
      }

      // Setup nodemailer transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Notification',
        text: message,
      });

      console.log(`Email sent to ${email}`);
    }

    // TODO: You can add SMS and in-app notification handling here

    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: notification,
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
