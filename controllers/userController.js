const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const factory = require('./../controllers/handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  // Loop through send obj
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// FOR USERS ACTUALLY **********************************************************************
exports.getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;

  next();
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

exports.getAllUsers = factory.getAllModel(User);

exports.getSingleUser = factory.getSingleModel(User);

exports.createUser = factory.createOne(User);

// Do NOT update passwords with this!s
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
