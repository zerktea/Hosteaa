const express = require("express");
const router = express.Router();
const createBooking = require("../controllers/bookingControllers/createBooking");
const getBookingsByUser = require("../controllers/bookingControllers/getBookingsByUser");


router.get("/api/bookings/:userId", getBookingsByUser.getBookingsByUser);
router.post("/api/newbooking", createBooking.createBooking);
module.exports = router;