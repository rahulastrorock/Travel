const mongoose = require('mongoose');

const travelGuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  budget: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  productType: { type: String, enum: ['tour', 'activity'], required: true },
  photos: [String],
  history: String,
  culture: String,
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  recommendations: {
    lodging: [{ name: String, description: String, priceRange: String }],
    dining: [{ name: String, cuisine: String, priceRange: String }],
    activities: [{ name: String, description: String, duration: String }]
  },
  tags: [String],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TravelGuide', travelGuideSchema);