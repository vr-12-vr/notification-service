const Notification = require('../models/Notification');

// POST /notifications
exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    // Basic validation
    if (!userId || !type || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Save the notification to MongoDB
    const notification = new Notification({
      userId,
      type,
      message
    });

    await notification.save();

    // Simulate sending (e.g., email, SMS, in-app)
    console.log(`Sending ${type} notification to user ${userId}: ${message}`);

    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: notification
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /users/:id/notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await Notification.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
