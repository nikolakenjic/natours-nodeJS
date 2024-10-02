const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./../controllers/handleFactory');

exports.setTourUsersIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAllModel(Review);

exports.getSingleReview = factory.getSingleModel(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);

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
