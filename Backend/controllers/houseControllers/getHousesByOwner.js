const House = require('../../models/Houses'); // Import your House model

const getHousesByOwner = async (req, res) => {
    console.log('getHousesByOwner controller');

  try {
    const ownerId = req.query._id; // Assuming your authentication middleware sets userId in req.user
    const houses = await House.find({ owner: ownerId });
    res.json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getHousesByOwner,
};
