const Booking = require("../../models/Bookings");

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name surename email profilePic')
            .populate({
                path: 'house',
                select: 'title owner', // Selecting only the title and owner fields from the house
                populate: { 
                    path: 'owner', // Populate the owner field of the house
                    select: 'name surename email profilePic' // Selecting fields of the owner
                }
            });
        res.json(bookings);

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};