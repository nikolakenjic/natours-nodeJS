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
const reviewRouter = require('./../routes/reviewRoutes');
// const { createReview } = require('../controllers/reviewController');

// router.param('id', checkID);

// // Nested routes for reviews
// // POST /tour/123132/reviews --------------------- nested routes
// // GET /tour/123132/reviews
// // GET /tour/123132/reviews/1231das

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictedTo('user'), createReview);
router.use('/:tourId/reviews', reviewRouter);

// Create checkBody middleware for input data and add to post crete tour
// Top 5 cheap
router.route('/top-5-cheap').get(top5Cheap, getAllTours);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictedTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictedTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getSingleTour)
  .patch(protect, restrictedTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictedTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
