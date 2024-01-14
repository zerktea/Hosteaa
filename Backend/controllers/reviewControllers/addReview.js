const Review = require("../../models/Reviews");

const newReview = async (req, res) => {
    console.log("addReview controller");
  
    const review = new Review({
        user: req.body.user,
        booking: req.body.booking,
        rating: req.body.rating,
        comment: req.body.comment,
    });
    await review.save();
    res.send(review);
}

module.exports = newReview