const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on .save() and .create()
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

UserSchema.pre('save', async function (next) {
  // only run if the password modified
  if (!this.isModified('password')) return next();

  //   Hashed the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //   Delete password confirmed
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
