const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'Dont create user',
  });
};

exports.updateMyProfile = (req, res, next) => {
  // Create error of user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates.Please use /updatePassword',
        400,
      ),
    );
  }

  // Send response
  res.status(200).json({
    status: 'success',
  });
};

exports.getSingleUser = (req, res) => {
  res.status(500).json({
    success: 'failed',
    message: 'Dont have single user',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    success: 'failed',
    message: 'Dont have update user',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    success: 'failed',
    message: 'Dont delete',
  });
};
