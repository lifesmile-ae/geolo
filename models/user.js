import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please Enter your firstname'],
    maxLength: [50, 'Your name cannot exceed 50 Character'],
  },
  lastname: {
    type: String,
    required: [true, 'Please Enter your lastname'],
    maxLength: [50, 'Your name cannot exceed 50 Character'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter your password'],
    minLength: [5, 'Your password must be longer than 5 Character'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  language: {
    type: String,
    default: 'en',
    enum: {
      values: ['en', 'ar', 'ru'],
    },
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user', 'reception', 'superadmin'],
    },
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

//Encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Generate Password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  //Hash and set to reset password token
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //Set token expire time after 30 minute
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

//Compare user Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
