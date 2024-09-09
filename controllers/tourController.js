// const fs = require('fs');
const Tour = require('./../models/tourModel');


// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// // Check ID
// exports.checkID = (req, res, next, val) => {
//   // if (req.params.id * 1 > tours.length) {
//   if (val * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   next();
// };

// middleware
// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     res.status(400).json({
//       status: 'failed',
//       message: 'Body should have name and price property',
//     });
//   }
//   next();
// };

// Tours controllers
exports.getAllTours = async (req, res) => {
  try {
    
    const tours = await Tour.find()
    
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success', 
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    })
  }
};

exports.getSingleTour = async (req, res) => {
 try {    
    const tour = await Tour.findById(req.params.id)
    
    res.status(200).json({
      status: 'success',
      data: {
        tour
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update Tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
