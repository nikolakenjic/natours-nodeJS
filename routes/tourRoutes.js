const express = require('express');
const router = express.Router();
const {
  getAllTours,
  createTour,
  getSingleTour,
  updateTour,
  deleteTour,
  top5Cheap,
  getMonthlyPlan,
  // checkID,
  // checkBody,
} = require('./../controllers/tourController');
const { protect, restrictedTo } = require('../controllers/authController');
const { createReview } = require('../controllers/reviewController');

// router.param('id', checkID);

// Create checkBody middleware for input data and add to post crete tour
// Top 5 cheap
router.route('/top-5-cheap').get(top5Cheap, getAllTours);
router.route('/monthly-plan/:year').get(top5Cheap, getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(protect, restrictedTo('admin', 'lead-guide'), deleteTour);
3;

// Nested routes for reviews
// POST /tour/123132/reviews --------------------- nested routes
// GET /tour/123132/reviews
// GET /tour/123132/reviews/1231das

router
  .route('/:tourId/reviews')
  .post(protect, restrictedTo('user'), createReview);

module.exports = router;
