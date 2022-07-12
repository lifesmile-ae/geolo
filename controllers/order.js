import Order from '../models/order';
import User from '../models/user';
import Cart from '../models/cart';
import SmilePoint from '../models/smilepoint';
import Shipping from '../models/shipping';
import catchAsyncError from '../middlewares/catchAsyncError';
import sendSMS from '../utils/sendsms';
import ErrorHandler from '../utils/errorHandler';

const createOrder = catchAsyncError(async (req, res, next) => {
  //search If cart exist
  const cart = await Cart.findOne({
    user: req.body.user,
    status: 'uncompleted',
  });

  if (cart) {
    const shipping = await Shipping.findOne({
      userid: req.body.user,
    });

    //create order
    req.body.cartitems = cart._id;
    req.body.orderStatus = {
      type: 'ordered',
      date: new Date(),
      isCompleted: false,
    };
    req.body.shippingid = shipping._id;

    const newOrder = await Order.create(req.body);

    //Send message to customer if its UAE Customer &  if order is created
    if (newOrder) {
      if (shipping.country === 'AE') {
        let mbl = shipping.mobile.slice(shipping.mobile.length - 9);
        const abd = await sendSMS(
          '+971' + mbl,
          `Thankyou for your purchase, we've received your order (#${newOrder.invoiceNumber}). We'll notify you once it's confirmed.`
        );
      }
    }

    // update cart status
    const expirecart = await Cart.findByIdAndUpdate(cart._id, {
      status: 'completed',
    });

    //update smilepoint

    if (req.body.reedemedPoints > 0) {
      //If point is reedemed
      const updateReedemedPoint = await SmilePoint.findOneAndUpdate(
        { userid: req.user._id },
        {
          currentPoint: req.body.totalAmount,
          $push: {
            pointsLog: {
              orderId: newOrder._id,
              message:
                'Reedemed Points while Purchasing For Order #' +
                newOrder.invoiceNumber,
              points: req.body.reedemedPoints,
            },
          },
        }
      );
      const updatePoint = await SmilePoint.findOneAndUpdate(
        { userid: req.user._id },
        {
          $push: {
            pointsLog: {
              orderId: newOrder._id,
              message:
                'Added Points For Purchasing For Order #' +
                newOrder.invoiceNumber,
              points: req.body.totalAmount,
            },
          },
        }
      );
    } else {
      //IF POINT IS NOT REEDEMED ADD POINT FROM PREVIOUS TO NEW PURCHASE
      const updatePoint = await SmilePoint.findOneAndUpdate(
        { userid: req.user._id },
        {
          currentPoint: Math.ceil(req.body.totalAmount + req.body.currentPoint),
          $push: {
            pointsLog: {
              orderId: newOrder._id,
              message: 'Added Points For Order #' + newOrder.invoiceNumber,
              points: req.body.totalAmount,
              date: new Date(),
            },
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      message: newOrder,
    });
  } else {
    return next(new ErrorHandler('No items in the cart', 404));
  }
});

const getOrder = catchAsyncError(async (req, res, next) => {
  const user = await Order.findById(req.query.orderId)
    .populate({
      path: 'cartitems',
      populate: {
        path: 'user',
        model: 'User',
      },
    })
    .populate({
      path: 'shippingid',
      populate: {
        path: 'userid',
        model: 'User',
      },
    })
    .populate('user');
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 200));
  }
  res.status(200).json({
    success: true,
    message: user,
  });
});

const getallOrder = catchAsyncError(async (req, res, next) => {
  const user = await Order.find({ user: req.query.userId }).populate({
    path: 'cartitems',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  if (!user) {
    return next(new ErrorHandler('You have not made any orders yet', 200));
  }
  res.status(200).json({
    success: true,
    message: user,
  });
});

const getfromInvoice = catchAsyncError(async (req, res, next) => {
  try {
    const user = await Order.find({ invoiceNumber: req.query.invoice })
      .populate({
        path: 'cartitems',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .populate({
        path: 'shippingid',
        populate: {
          path: 'userid',
          model: 'User',
        },
      })
      .populate('user');
    if (user.length > 0) {
      res.status(200).json({
        success: true,
        message: user,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'No order found with this invoice ID',
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'No order found with this invoice ID',
    });
  }
});

const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.body.orderId, {
    paymentStatus: req.body.paymentStatus,
  });
  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 200));
  }
  res.status(200).json({
    success: true,
    message: order,
  });
});

export { createOrder, getOrder, getallOrder, getfromInvoice, updateOrder };
