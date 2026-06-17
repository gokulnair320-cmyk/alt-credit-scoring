// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Create a new Mongoose schema which defines the structure of the User document in the database
const userSchema = new mongoose.Schema({
  // 'name' field: must be a string, is required, and whitespace is trimmed from both ends
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  // 'email' field: must be a string, is required, must be unique across the database, and is trimmed and converted to lowercase
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  // 'phone' field: must be a string, kept optional, and trimmed
  phone: {
    type: String,
    trim: true
  },
  // 'password' field: must be a string, is required to be present
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  // 'role' field: a string that is restricted to specific enum values, defaulting to 'user'
  role: {
    type: String,
    enum: ['user', 'employee', 'admin'],
    default: 'user'
  },
  // 'employeeId' field: a string to identify employees. 'unique' and 'sparse' mean it must be unique if provided, but can be left empty
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  }
}, {
  // 'timestamps' option: Mongoose will automatically create and manage 'createdAt' and 'updatedAt' fields for us
  timestamps: true
});

// Create the 'User' model using the schema we just defined
const User = mongoose.model('User', userSchema);

// Export the 'User' model so it can be imported and used in other parts of our application (e.g., controllers)
module.exports = User;
