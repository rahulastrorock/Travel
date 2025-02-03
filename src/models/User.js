const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'visitor'], default: 'visitor' },
  favoriteGuides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelGuide' }],
  createdAt: { type: Date, default: Date.now },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelGroup' }]
});

module.exports = mongoose.model('User', userSchema);