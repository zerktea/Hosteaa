const userModel = require("../../models/Users");

exports.logedUser = async (req, res) => {
    
  try {
    // Access user information from the request object
    const { userId } = req.user;

    // Fetch additional user data from the database
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user information in the response
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};