const jwt = require('jsonwebtoken');

// authMiddleware function that runs before the route handler
const authMiddleware = (req, res, next) => {
  // Read JWT from headers:
  // The 'Authorization' header is the standard place to send credentials.
  // It is usually formatted as 'Bearer <token>'. We read it from req.headers.authorization.
  const authHeader = req.headers.authorization;

  // Validate that the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract the actual token string by splitting the header by space
  // This separates 'Bearer' from the '<token>' and we take the second part (index 1)
  const token = authHeader.split(' ')[1];

  // Validate that a token exists after the 'Bearer ' prefix
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // What jwt.verify() does:
    // It takes the token and the secret key (process.env.JWT_SECRET) to check if the token is valid,
    // not expired, and hasn't been tampered with.
    // If successful, it returns the decoded payload (e.g., { userId, role }).
    // If it fails, it throws an error that will be caught by the catch block.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Why req.user is created:
    // We attach the decoded payload to the request object (req) under 'req.user'.
    // This allows any subsequent middleware or controller to know exactly who is making the request,
    // without having to parse the token again.
    req.user = decoded;

    // Why next() is needed:
    // next() is a callback function that tells Express to move on to the next middleware
    // or to the actual route controller. If we don't call next(), the request will just hang
    // and never send a response.
    next();
  } catch (error) {
    // If verification fails (e.g. invalid signature, expired), return 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
