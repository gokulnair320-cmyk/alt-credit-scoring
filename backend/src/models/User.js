// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Import bcrypt for hashing passwords securely before saving them to the database
const bcrypt = require('bcrypt');

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
    enum: ['applicant', 'officer', 'admin'],
    default: 'applicant'
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

// Mongoose pre-save middleware (hook) that runs right before a document is saved to the database
userSchema.pre('save', async function (next) {
  // Check if the 'password' field has been modified in this operation (e.g., during creation or password reset).
  // If it hasn't been modified (e.g., just updating the user's name), skip hashing to prevent double-hashing.
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a cryptographic salt with a cost factor of 10. The salt adds randomness to the hash.
    const salt = await bcrypt.genSalt(10);
    
    // Hash the plain-text password using the generated salt
    // 'this' refers to the current User document being saved
    this.password = await bcrypt.hash(this.password, salt);
    
    // Proceed to the next middleware or save the document
    next();
  } catch (error) {
    // If an error occurs during hashing, pass it to the next middleware to handle the error
    next(error);
  }
});

// Create the 'User' model using the schema we just defined
const User = mongoose.model('User', userSchema);

// Export the 'User' model so it can be imported and used in other parts of our application (e.g., controllers)
module.exports = User;
