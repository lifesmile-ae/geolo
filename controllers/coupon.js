import Coupon from '../models/coupon';
import catchAsyncError from '../middlewares/catchAsyncError';

export const getCoupon = catchAsyncError(async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.query.code });
    if (!coupon) {
      return res.status(200).json({
        status: 'fail',
        message: 'Sorry !!! Coupon Code Invalid',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: coupon,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

export const postCoupon = catchAsyncError(async (req, res) => {
  try {
    const { discount, device, code, status } = req.body;
    const coupon = await Coupon.create({ discount, device, code });
    res.status(201).json({
      status: 'success',
      data: coupon,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});
