const mongoose = require('mongoose');

const userItinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basedOnGuide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TravelGuide',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    customItinerary: [{
        day: Number,
        activities: [{
            name: String,        // Name of the activity
            time: String,        // Time for the activity
            duration: String     // Duration of the activity
        }],
        selectedLodging: {
            name: String,
            description: String,
            priceRange: String
        },
        selectedDining: [{
            name: String,
            cuisine: String,
            priceRange: String
        }]
    }],
    totalBudget: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'INR' }
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = userItinerarySchema;