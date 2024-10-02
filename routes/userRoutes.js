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
} = require('./../controllers/authController');

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

router.route('/updatePassword').patch(protect, updatePassword);

router.route('/getMyProfile').get(protect, getMyProfile, getSingleUser);
router.route('/updateMyProfile').patch(protect, updateMyProfile);
router.route('/deleteMyProfile').delete(protect, deleteMyProfile);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
