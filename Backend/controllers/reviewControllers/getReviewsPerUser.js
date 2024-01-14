const Review = require("../../models/Reviews");

const getReviewsPerUser = async (req, res) => {
    console.log('getReviewsPerUser controller');
    console.log(req.params);
    const userId = req.params.userId;
    try {
        const reviews = await Review.find({ user: userId });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

module.exports = getReviewsPerUser