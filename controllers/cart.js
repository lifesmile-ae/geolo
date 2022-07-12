import Cart from '../models/cart';
import catchAsyncError from '../middlewares/catchAsyncError';

const createCart = catchAsyncError(async (req, res) => {
  try {
    const checkCart = await Cart.findOne({
      user: req.user._id,
      status: 'uncompleted',
    });
    if (checkCart) {
      const cart = await Cart.findByIdAndUpdate(checkCart._id, req.body);
      res.status(200).json({
        success: true,
        message: 'Cart Updated successfully!',
        cart,
      });
    } else {
      const newCart = await Cart.create(req.body);
      res.status(200).json({
        success: true,
        message: 'Cart Added successfully!',
        newCart,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

export { createCart };
