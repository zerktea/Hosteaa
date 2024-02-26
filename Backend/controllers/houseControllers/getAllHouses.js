const House = require('../../models/Houses');
const Review = require("../../models/Reviews");
const Booking = require("../../models/Bookings");
const User = require("../../models/Users");
const mongoose = require("mongoose");

exports.getAllHouses = async (req, res) => {
    try {
        const houses = await House.find({ disabled: false }).populate('owner', 'email');

        // Iterate through each house and calculate the average rating
        const housesWithAverageRating = await Promise.all(houses.map(async (house) => {
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
                {
                    $project: {
                        _id: 1,
                        comment: 1,
                        rating: 1,
                        "bookingDetails.house": 1,
                        "bookingDetails.user": 1,
                        "userDetails.profilePic": { $cond: [{$eq: ["$_id", null]}, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", "$userDetails.profilePic"] },
                        "userDetails.name": { $cond: [{$eq: ["$userDetails.name", null]}, null, "$userDetails.name"] },
                        "userDetails.surename": { $cond: [{$eq: ["$userDetails.surename", null]}, null, "$userDetails.surename"] },
                    },
                },
                {
                    $match: {
                        "bookingDetails.house": house._id, // Match reviews for the current house
                    },
                },
            ]);

            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

            // Add averageRating and reviewsLength to house object
            return {
                ...house.toObject(),
                averageRating,
                reviewsLength: reviews.length
            };
        }));

        res.json(housesWithAverageRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
