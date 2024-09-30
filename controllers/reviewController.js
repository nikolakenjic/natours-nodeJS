const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  // Nested routes GET endpoint
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

// exports.getSingleReview = catchAsync(async (req, res, next) => {
//   const review = await Review.findById(req.params.id);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.updateReview = catchAsync(async (req, res, next) => {
//   const updateReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: {
//       review: updateReview,
//     },
//   });
// });

// exports.deleteReview = catchAsync(async (req, res, next) => {
//   await Review.findByIdAndDelete(req.params.id);

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
