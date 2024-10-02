const express = require('express');
const {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  setTourUsersIds,
} = require('../controllers/reviewController');
const { protect, restrictedTo } = require('../controllers/authController');

// We add mergeParams if we have nested routes and want some /:id from another middleware
const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictedTo('user'), setTourUsersIds, createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .patch(restrictedTo('user', 'admin'), updateReview)
  .delete(restrictedTo('user', 'admin'), deleteReview);

module.exports = router;
