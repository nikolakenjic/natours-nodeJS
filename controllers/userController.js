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
    success: 'failed',
    message: 'Dont create user',
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
