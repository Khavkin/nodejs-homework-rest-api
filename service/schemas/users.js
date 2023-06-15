const mongoose = require('mongoose');
const handleMangooseError = require('../../middlewares/handleMangooseError');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { collection: 'users' }
);

user.post('save', handleMangooseError);

const UserModel = mongoose.model('user', user);

module.exports = UserModel;
