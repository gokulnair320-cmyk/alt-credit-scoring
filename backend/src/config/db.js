// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to handle the database connection
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    // process.env.MONGO_URI will hold the Atlas connection string
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If successful, log the host we connected to
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error message
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the Node.js process with a failure code (1) to stop the application
    process.exit(1);
  }
};

// Export the connectDB function so it can be called from our server.js
module.exports = connectDB;
