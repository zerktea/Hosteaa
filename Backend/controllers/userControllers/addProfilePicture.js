const userModel = require("../../models/Users");
const authenticateUser = require('../userControllers/authenticateUser');

const addProfilePicture = async (req, res) => {
  console.log('addProfilePicture controller');

 

  try {
    const userId = req.body.userId;
    const profilePicture = req.file.path.replace(/\\/g, '/'); 
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      user.profilePic = profilePicture;
      await user.save();
      res.json({ message: 'Profile picture added successfully' });
    }

  } catch (error) {
    console.error('Error adding profile picture:', error);
    res.status(500).json({ error: 'Failed to add profile picture' });
  }

 
  
};

module.exports = addProfilePicture;