const Review = require("../../models/Reviews");
const Booking = require("../../models/Bookings");
const User = require("../../models/Users");
const mongoose = require("mongoose");

const reviewsPerHouse = async (req, res) => {
  try {
    console.log("reviewsPerHouse controller");
    const houseId = req.params.houseId; // Assuming houseId is part of the request parameters
    console.log(houseId);

    // 1. Retrieve all reviews for the specified house
    const reviews = await Review.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "bookingDetails",
        },
      },
      {
        $unwind: "$bookingDetails",
      },
      // 2. Join with the `Users` collection to get user information
      {
        $lookup: {
          from: "users",
          localField: "bookingDetails.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      // 3. Validate user existence and profile picture
      {
        $project: {
          _id: 1,
          comment: 1,
          rating: 1,
          "bookingDetails.house": 1,
          "bookingDetails.user": 1,
          // If user doesn't exist, set profilePic to default image
          "userDetails.profilePic": { $cond: [{$eq: ["$_id", null]}, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", "$userDetails.profilePic"] },
          // Exclude user's name and surname if not available
          "userDetails.name": { $cond: [{$eq: ["$userDetails.name", null]}, null, "$userDetails.name"] },
          "userDetails.surename": { $cond: [{$eq: ["$userDetails.surename", null]}, null, "$userDetails.surename"] },
        },
      },
      //4. Filter reviews by the specified house ID
      {
        $match: {
          "bookingDetails.house": new mongoose.Types.ObjectId(houseId),
        },
      },
 
    ]);
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    const resultWithAverage = {
      reviews,
      averageRating,
      reviewsLength: reviews.length,
    };
    console.log("results", averageRating);
    res.json(resultWithAverage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = reviewsPerHouse;