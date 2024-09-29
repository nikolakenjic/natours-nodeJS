const mongoose = require('mongoose');
// const Tour = require('./tourModel')

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour.'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user.'],
  },
});

// Populate ******************************************************
ReviewSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'tour',
      select: '-__v',
    },
    {
      path: 'user',
      select: '-__v',
    },
  ]);

  next();
});

module.exports = mongoose.model('Review', ReviewSchema);
