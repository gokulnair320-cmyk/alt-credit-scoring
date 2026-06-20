// Import the User model to interact with the users collection in the database
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Define an asynchronous function to handle the login logic
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Ensure required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required fields' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token containing userId and role
    const payload = {
      userId: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return success message and token
    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(`Profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
};


// Export the registerUser and loginUser controller functions so they can be used in the routes file
module.exports = {
  registerUser,
  loginUser,
  getProfile
};
