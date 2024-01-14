const Booking = require("../../models/Bookings")

exports.getBookingsByUser = async (req, res) => {
    console.log('getBookingsByUser controller');
    const userId = req.params.userId; 
   
    try {
        const bookings = await Booking.find({ user: userId }).populate({
            path: 'house',
            populate: { path: 'owner', select: 'name surename email profilePic' }
        }).select('house checkInDate checkOutDate totalAmount'); 
       
        res.json(bookings);
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}