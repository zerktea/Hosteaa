const Booking = require("../../models/Bookings");

exports.getBookingsByHouseId = async (req, res) => {
    console.log('getBookingsByHouseId controller');
    const houseId = req.params.houseId;
    try {
        const bookings = await Booking.find({ house: houseId }).populate({
            path: 'user',
            select: 'name surename email profilePic'
        }).select('house checkInDate checkOutDate totalAmount');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
