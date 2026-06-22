// Import the Express module. This provides the framework for our web application.
const express = require('express');

// Initialize the Express application instance. This object will be used to configure routes and middleware.
const app = express();

// Add middleware to parse incoming JSON payloads. This allows the app to understand JSON data sent in request bodies.
app.use(express.json());

// Import the authentication routes from the routes directory
const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Mount the authentication routes under the '/api/auth' base path
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);

// Export the initialized Express application so it can be imported and used by other files, like server.js.
module.exports = app;
