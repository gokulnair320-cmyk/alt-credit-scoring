// Import the initialized Express application from our app.js file.
const app = require('./app');

// Define the port number our server will listen on. Using 5000 as requested.
const PORT = 5000;

// Tell the Express application to start listening for incoming HTTP requests on the specified port.
app.listen(PORT, () => {
  // Once the server has successfully started, log a message to the console indicating it's running.
  console.log(`Server is running on port ${PORT}`);
});
