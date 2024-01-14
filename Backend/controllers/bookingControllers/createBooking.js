const Booking = require("../../models/Bookings")

exports.createBooking = async (req,res) => {
    console.log('createBooking controller');
    const booking = new Booking({
        checkInDate:req.body.checkIn,
        checkOutDate:req.body.checkOut,
        totalAmount:req.body.totalAmount,
        house:req.body.house,
        user:req.body.user,
    });
    await booking.save();
    res.send(booking);

}