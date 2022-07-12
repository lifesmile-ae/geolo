import Cart from '../models/cart';
import catchAsyncError from '../middlewares/catchAsyncError';

const createTest = catchAsyncError(async (req, res) => {
  const updatePointoLog = await SmilePoint.create({
    userid: req.user._id,
    orderId: newOrder._id,
    pointsLog: {
      message:
        'Reedemed Points while Purchasing For Order #' + newOrder.invoiceNumber,
      points: req.body.reedemPoint,
    },
  });
  const newupdatePointLog = await SmilePoint.create({
    userid: req.user._id,
    orderId: newOrder._id,
    pointsLog: {
      message:
        'Given Points while Purchasing For Order #' + newOrder.invoiceNumber,
      points: req.body.totalAmount,
    },
  });
});

export { createTest };
