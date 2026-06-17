// Import the Express module. This provides the framework for our web application.
const express = require('express');

// Initialize the Express application instance. This object will be used to configure routes and middleware.
const app = express();

// Add middleware to parse incoming JSON payloads. This allows the app to understand JSON data sent in request bodies.
app.use(express.json());

// Export the initialized Express application so it can be imported and used by other files, like server.js.
module.exports = app;
