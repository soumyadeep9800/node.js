const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // Change "myNewDatabase" to your preferred name

// Set up MongoDB connection
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB server'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

// Export the database
module.exports = db;
