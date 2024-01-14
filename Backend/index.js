const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userRoute = require('./Routes/UserRoute');
const houseRoute = require('./Routes/HouseRoute');
const  bookingRoute = require('./Routes/BookingRoute');
const reviewRoute = require('./Routes/ReviewRoute');
const cookieParser = require('cookie-parser');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
// Enable CORS
app.use(cors());
//define routes
app.use("/",userRoute)
app.use("/",houseRoute)
app.use("/",bookingRoute)
app.use("/",reviewRoute)

//connect to db
mongoose.connect('mongodb+srv://Zerktea:Zerktea@hostea.pnmm7rm.mongodb.net/HosteaBase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
/////
