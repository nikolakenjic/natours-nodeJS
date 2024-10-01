const express = require('express');
const {
  getAllReviews,
  createReview,
  //   getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, restrictedTo } = require('../controllers/authController');

// We add mergeParams if we have nested routes and want some /:id from another middleware
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictedTo('user'), createReview);

router
  .route('/:id')
  // .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;
