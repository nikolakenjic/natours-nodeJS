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

// router.param('id', checkID);

// Create checkBody middleware for input data and add to post crete tour
// Top 5 cheap
router.route('/top-5-cheap').get(top5Cheap, getAllTours);
router.route('/monthly-plan/:year').get(top5Cheap, getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
