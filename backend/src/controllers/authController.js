// Import the User model to interact with the users collection in the database
const User = require('../models/User');

// Define an asynchronous function to handle the registration logic
const registerUser = async (req, res) => {
  try {
    // Destructure the necessary fields from the incoming request body, intentionally omitting 'role'
    const { name, email, password, phone, employeeId } = req.body;

    // Validation: Ensure required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required fields' });
    }

    // Query the database to check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    // If a user is found, it means the email is already taken
    if (existingUser) {
      // Return a 400 Bad Request HTTP status with a JSON error message
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // If the email does not exist, create a new user document using the request data
    // Note: Password hashing is intentionally omitted as per the requirements
    // Security: Force the role to 'applicant' to prevent privilege escalation
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      role: 'applicant',
      employeeId
    });

    // Return a 201 Created HTTP status and a JSON response with the newly created user data
    // Security: Only return safe fields and explicitly omit the password
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    // If any unexpected error occurs during the process, log it to the console for debugging
    console.error(`Registration error: ${error.message}`);
    // Return a 500 Internal Server Error status with a JSON error message to the client
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Export the registerUser controller function so it can be used in the routes file
module.exports = {
  registerUser
};
