import User from '../models/user';
import Guest from '../models/guest';
import SmilePoint from '../models/smilepoint';
import Shipping from '../models/shipping';
import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import absoluteUrl from 'next-absolute-url';
import sendMail from '../utils/sendmail';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getSession } from 'next-auth/client';

//Register New User  =>  /api/auth/register //POST METHOD
const registerUser = catchAsyncError(async (req, res) => {
  const { firstname, lastname, email, password, locale } = req.body;
  const user = await User.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password,
    language: locale,
  });

  if (user) {
    const point = await SmilePoint.create({
      userid: user._id,
      pointsLog: {
        message: 'Welcome Points Given By LifeSmile',
        points: 100,
      },
    });
    if (point) {
      const welcomepoint = await SmilePoint.findOneAndUpdate(
        { _id: point._id },
        { currentPoint: 100 }
      );
    }
  }
  res.status(200).json({
    success: true,
    message: 'Registered Successfully',
  });
});

//Add Shipping address of the registered user => /api/auth/shipping  //POST METHOD
const registerShipping = catchAsyncError(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return next(new ErrorHandler('You are not allowed', 200));
  }
  try {
    const shipping = new Shipping(req.body);
    await shipping.save();
    res.status(200).json({
      success: true,
      message: 'Shipping address added successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateShipping = catchAsyncError(async (req, res, next) => {
  try {
    const shipping = await Shipping.findOneAndUpdate(
      { userid: req.body.userid },
      req.body
    );
    res.status(200).json({
      success: true,
      message: 'Shipping address updated successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//GET Shipping address of the registered user => /api/auth/shipping  //GET METHOD
const getShipping = catchAsyncError(async (req, res, next) => {
  const user = await Shipping.find({ userid: req.query.user });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 200));
  }
  res.status(200).json({
    success: true,
    message: user,
  });
});

//GET current smile points of the user => /api/auth/shipping  //GET METHOD
const getPoints = catchAsyncError(async (req, res, next) => {
  const user = await SmilePoint.findOne({ userid: req.query.user });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 200));
  }
  res.status(200).json({
    success: true,
    message: user,
  });
});

//Forgot Password  => api/password/forgot
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 200));
  }

  //Get reset token =>
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset password url
  const { origin } = absoluteUrl(req);
  const resetUrl = `${origin}/admin/reset/${resetToken}`;
  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it`;
  try {
    await sendMail({
      email: user.email,
      subject: 'Password recovery',
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password => api/auth/password/:token
const resetPassword = catchAsyncError(async (req, res, next) => {
  //Hash URL Token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is Invalid or has been expired',
        200
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password doesnot match', 400));
  }

  //Setup the new password
  user.password = req.body;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: 'Password updated Successfully',
  });
});

//Update User Profile
const updateUser = catchAsyncError(async (req, res, next) => {
  let message = '';
  const {
    firstname,
    lastname,
    email,
    language,
    oldpassword,
    newPassword,
    userid,
  } = req.body;

  if (oldpassword !== '') {
    const user = await User.findOne({ _id: userid }).select('+password');
    if (!user) {
      return next(new ErrorHandler('User not found with this email', 200));
    }
    const isPasswordMatch = await user.comparePassword(oldpassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid Old Password', 200));
    }
    message = await User.findOneAndUpdate(
      { _id: userid },
      {
        firstname,
        lastname,
        email,
        language,
        password: await bcrypt.hash(newPassword, 10),
      },
      {
        new: true,
      }
    );
  } else {
    message = await User.findOneAndUpdate(
      { _id: userid },
      { firstname, lastname, email, language },
      {
        new: true,
      }
    );
  }
  res.status(200).json({
    success: true,
    message,
  });
});

//Register New User  =>  /api/auth/register //POST METHOD
const registerCustomer = catchAsyncError(async (req, res) => {
  const user = await Guest.create(req.body);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  }
});

export {
  registerUser,
  forgotPassword,
  resetPassword,
  registerShipping,
  getShipping,
  getPoints,
  updateShipping,
  updateUser,
  registerCustomer,
};
