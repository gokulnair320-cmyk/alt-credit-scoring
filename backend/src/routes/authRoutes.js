// Import the Express module to create a router instance
const express = require('express');

// Import the registerUser and loginUser controller functions from the authController file
const { registerUser, loginUser } = require('../controllers/authController');

// Initialize a new Express router instance to define our authentication routes
const router = express.Router();

// Define a POST route at the '/register' path and attach the registerUser controller function to handle incoming requests
router.post('/register', registerUser);

// Define a POST route at the '/login' path and attach the loginUser controller function to handle incoming requests
router.post('/login', loginUser);

// Export the router so it can be imported and mounted in the main app.js file
module.exports = router;
