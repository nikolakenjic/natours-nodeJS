const mongoose = require('mongoose');
// const Tour = require('./tourModel')

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tourId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
  },
  userId: {
    ype: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
