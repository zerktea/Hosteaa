const mongoose=require('mongoose');


const ReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings', 
        required: true,
        unique: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

  
const Review = mongoose.model("Review",ReviewsSchema);
module.exports = Review;