const mongoose = require('mongoose');
const House = require('./models/Houses');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Zerktea:Zerktea@hostea.pnmm7rm.mongodb.net/HosteaBase');
console.log('Connected to MongoDB');

// Migration script to update existing documents
House.updateMany({}, { $set: { "location": { country: "Default Country", city: "Default City", street: "Default Street", zip: "Default Zip" } } }, { multi: true }, function(err, res) {
  if (err) {
    console.error("Error updating documents:", err);
  } else {
    console.log("Documents updated successfully:", res);
  }
  // Close the MongoDB connection
  mongoose.connection.close();
});