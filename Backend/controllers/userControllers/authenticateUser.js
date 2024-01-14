// authenticateUser.js

const jwt = require('jsonwebtoken');
const userModel = require('../../models/Users');

const authenticateUser = async (req, res, next) => {
    console.log('authenticateUser controller');
  try {
    // Get the JWT token from the cookie
    const token = req.headers.authorization;
   
    if (!token) {
      // No token found, user is not authenticated
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      // Invalid token, user is not authenticated
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch user data based on the user ID in the token
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      // User not found, token is invalid
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user information to the request object
    req.user = { userId: user._id, email: user.email };
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authenticateUser;