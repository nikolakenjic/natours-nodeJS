const mongoose = require('mongoose');
const slugify = require('slugify');

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a price'],
    unique: true,
    trim: true,
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() ***************************
TourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// TourSchema.pre('save', function (next) {
//   console.log('Document saving...');
//   next();
// });

// TourSchema.post('save', function (doc, next) {
//   console.log('Doc', doc);
//   next();
// });

// QUERY MIDDLEWARE *****************************************************************
// TourSchema.pre('find', function (next) {
TourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// TourSchema.post(/^find/, function (docs, next) {
//   console.log('DOCS', docs);
//   next();
// });

module.exports = mongoose.model('Tour', TourSchema);
