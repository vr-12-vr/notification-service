const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // example

// Example route with function handler
router.get('/:id/notifications', userController.getUserNotifications);

module.exports = router;
