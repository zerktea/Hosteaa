const House = require('../../models/Houses');

exports.getAllHouses = async (req, res) => {
    try {
        const houses = await House.find().populate('owner', 'email');
       
        res.json(houses);
    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
}