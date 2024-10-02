const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateMyProfile,
  deleteMyProfile,
  getMyProfile,
} = require('./../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictedTo,
} = require('./../controllers/authController');

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

// Protect all routes bellow
router.use(protect);

router.route('/updatePassword').patch(updatePassword);

router.route('/getMyProfile').get(getMyProfile, getSingleUser);
router.route('/updateMyProfile').patch(updateMyProfile);
router.route('/deleteMyProfile').delete(deleteMyProfile);

// Protected by admin
router.use(restrictedTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
