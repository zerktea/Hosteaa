const userModel = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.userLogin = async (req, res) => {
  console.log('Login controller');
try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({email});

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send the JWT token in the response
    
    res.cookie('jwt', token, { httpOnly: true });

    // Your authentication was successful, you can create and send a JWT token
    res.json({ message: 'Login successful', token  });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
}

exports.loginadmin = async (req, res) => {
  console.log('Login controller');
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({email});

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.role === 2) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send the JWT token in the response
    
    res.cookie('jwt', token, { httpOnly: true });

    // Your authentication was successful, you can create and send a JWT token
    res.json({ message: 'Login successful', token  });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}