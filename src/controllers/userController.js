// src/controllers/userController.js
const Notification = require('../models/Notification');

exports.getUserNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await Notification.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
