import SmilePoint from '../models/smilepoint';
import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';

const getPoints = catchAsyncError(async (req, res, next) => {
  const user = await SmilePoint.findOne({ userid: req.query.userId });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 200));
  }
  res.status(200).json({
    success: true,
    message: user,
  });
});

export { getPoints };
