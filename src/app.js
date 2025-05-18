const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notifications');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

connectDB();
app.use('/notifications', notificationRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
