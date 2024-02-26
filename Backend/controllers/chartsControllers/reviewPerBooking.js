const Review = require("../../models/Reviews");
const Booking = require("../../models/Bookings");

const mongoose = require("mongoose");

const reviewPerBooking = async (req, res) => {
  try {
    const pastBookings = await Booking.find({
      checkOutDate: {
        $lt: new Date(),
      },
    });
    console.log(pastBookings.length);
    let pastbooking = pastBookings.length;
    let reviews = Review.find();
    const reviewsPerBooking = (await reviews).length
    const bookingnoreview = pastbooking - reviewsPerBooking
    res.json({
      pastbooking,
      reviewsPerBooking,
      bookingnoreview
    });
  } catch (error) {
    console.error("Error fetching past bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = reviewPerBooking;
