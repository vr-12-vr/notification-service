# Notification Service

## Overview
This is a Node.js-based notification service supporting email, SMS (simulated), and in-app notifications. It uses MongoDB to store notifications and RabbitMQ for messaging (optional).

## Features
- Send notifications via Email, SMS (simulation), or In-App.
- Store notifications in MongoDB.
- REST API endpoints to create and retrieve notifications.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Nodemailer (for sending emails)
- RabbitMQ (message queue, optional)

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account with a cluster
- Gmail account with app password for email notifications
- RabbitMQ installed locally or accessible via URI (optional)

### Environment Variables
Create a `.env` file in the root directory of the project with the following content (replace placeholders with your actual values):


### Installation
1. Clone the repository:
2. Install dependencies:
3. Start the server (development mode):



The server should start on `http://localhost:5000`.

### API Endpoints

**Send Notification:**

# Notification Service

## API Endpoints

### POST /notifications
Send a notification.

**Request Body:**

```json
{
  "userId": "12345",
  "type": "email",
  "message": "Hello! This is a test notification.",
  "email": "recipient@example.com"  // required if type is email
}


### GET /users/:id/notifications
Get all notifications for a specific user.

**Request Example:**

```bash
GET /users/12345/notifications
