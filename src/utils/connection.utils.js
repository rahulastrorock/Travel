const mongoose = require("mongoose")
require('dotenv').config();

const userSchema = require('../models/User')
const travelGuideSchema = require('../models/TravelGuide')
const groupSchema = require('../models/TravelGroup')
const reviewSchema = require('../models/Review')


let collection = {}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

collection.getUserCollection = mongoose.model('User', userSchema);
collection.getTravelGuideCollection = mongoose.model('TravelGuide', travelGuideSchema);
collection.getGroupCollection = mongoose.model('Group', groupSchema);
collection.getReviewCollection = mongoose.model('Review', reviewSchema);

module.exports = collection;