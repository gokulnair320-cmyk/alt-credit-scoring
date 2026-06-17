// Import the dotenv package and configure it to load environment variables from a .env file into process.env
require('dotenv').config();

// Import the database connection function from our config directory
const connectDB = require('./config/db');

// Import the initialized Express application from our app.js file
const app = require('./app');

// Call the connectDB function to establish a connection to MongoDB before starting the server
connectDB();

// Define the port number our server will listen on. We check process.env.PORT first, then fallback to 5000
const PORT = process.env.PORT || 5000;

// Tell the Express application to start listening for incoming HTTP requests on the specified port
app.listen(PORT, () => {
  // Once the server has successfully started, log a message to the console indicating it's running
  console.log(`Server is running on port ${PORT}`);
});
