const express = require('express');
const {
  getAllReviews,
  createReview,
  //   getSingleReview,
  //   updateReview,
  //   deleteReview,
} = require('../controllers/reviewController');
const { protect, restrictedTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllReviews).post(protect, createReview);

// router
//   .route('/:id')
//   .get(getSingleReview)
//   .patch(updateReview)
//   .delete(deleteReview);

module.exports = router;
