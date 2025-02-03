const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGODB_URI); // Debug line
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;