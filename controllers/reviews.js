import Product from '../models/product';
import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';

export const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, fullname, email, comment, productid } = req.body;

  let product = await Product.find({ slug: productid });
  if (!product) {
    return next(new ErrorHandler('Product not found with this id', 404));
  }
  try {
    const saveReview = await Product.findOneAndUpdate(
      { slug: productid },
      {
        $push: {
          reviews: {
            rating,
            fullname,
            email,
            comment,
            createdAt: new Date(),
          },
        },
      }
    );
    res.status(200).json({
      success: true,
      message: 'Review added successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getReview = catchAsyncError(async (req, res, next) => {
  const { productid } = req.query;
  try {
    const average = await Product.aggregate([
      { $match: { slug: productid } },
      { $unwind: '$reviews' },
      {
        $group: {
          _id: null,
          averageRate: {
            $avg: '$reviews.rating',
          },
        },
      },
    ]);

    if (!average) {
      return next(new ErrorHandler('Product not found with this id', 404));
    }

    const groupBy = await Product.aggregate([
      { $match: { slug: productid } },
      { $unwind: '$reviews' },
      {
        $group: {
          _id: '$reviews.rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    let count = '';
    const reviews = await Product.find({
      slug: productid,
    })
      .sort({ 'reviews.createdAt': 1 })
      .select('reviews');

    if (reviews.length > 0) {
      count = Object.keys(reviews[0].reviews).length;
    } else {
      count = 0;
    }

    res.status(200).json({
      success: true,
      average,
      reviews,
      count,
      groupBy,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
