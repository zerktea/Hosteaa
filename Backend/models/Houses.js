const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  pictures: {
  type: [String],
  required: true
  },
  checkInTime: {
    type: String,
    required: true,
  },
  checkOutTime: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    //required: true,
  },
  // Reference to the user who owns the house
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
