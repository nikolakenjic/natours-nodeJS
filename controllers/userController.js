const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  // Loop through send obj
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  // Create error of user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates.Please use /updatePassword',
        400,
      ),
    );
  }

  // Filtered out unwanted fields names that are not allowed to change
  const filteredBody = filterObj(req.body, 'name', 'email');
  // Update user Document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // Send response
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
