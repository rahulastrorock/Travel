const mongoose = require("mongoose")
require('dotenv').config();

const userSchema = require('../models/User')
const travelGuideSchema = require('../models/TravelGuide')
const groupSchema = require('../models/TravelGroup')
const reviewSchema = require('../models/Review')
const itinerariesSchema = require('../models/UserItinerary')


let collection = {}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

collection.getUserCollection = mongoose.model('User', userSchema);
collection.getTravelGuideCollection = mongoose.model('TravelGuide', travelGuideSchema);
collection.getGroupCollection = mongoose.model('Group', groupSchema);
collection.getReviewCollection = mongoose.model('Review', reviewSchema);
collection.getItinerariesCollection = mongoose.model('Itinerary', itinerariesSchema);

module.exports = collection;