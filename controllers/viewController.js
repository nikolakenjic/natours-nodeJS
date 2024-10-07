const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1.Get tour data from collection
  const tours = await Tour.find();

  // 2.Build template

  // 3.Render that template using data from 1.
  res.status(200).render('overview', {
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1.Get  data for requested Tour (including reviews and guides)
  // const slugToName = (slug) => {
  //   return slug
  //     .split('-') // Split by hyphen (-)
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  //     .join(' '); // Join words with spaces
  // };

  // const tourName = slugToName(req.params.tourName);
  // const tour = await Tour.findOne({ name: tourName });

  const tour = await Tour.findOne({ slug: req.params.tourName }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  console.log('Tour', tour);

  // 2.Build template

  // 3.Render that template using data from 1.
  res.status(200).render('tour', {
    tour,
  });
});
