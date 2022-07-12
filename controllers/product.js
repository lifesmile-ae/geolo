import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import Product from '../models/product';
import APIFeatures from '../utils/apiFeature';
import Category from '../models/category';

export const singleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.query.slug }).populate(
    'categories'
  );
  const category = await Category.findById(
    product.categories.map((c) => c.parentId)
  );
  const average = await Product.aggregate([
    { $match: { slug: req.query.slug } },
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
  let count = '';
  const reviews = await Product.find({
    slug: req.query.slug,
  })
    .sort({ 'reviews.createdAt': 1 })
    .select('reviews');

  if (reviews.length > 0) {
    count = Object.keys(reviews[0].reviews).length;
  } else {
    count = 0;
  }
  if (!product) {
    return next(new ErrorHandler('Product not found with this id', 404));
  }
  res.status(200).json({
    success: true,
    product,
    category,
    average,
    count,
  });
});

/***
 * Get All Products
 * @param get >> api/product
 * @returns {list of all the products|*}
 */
export const allProducts = catchAsyncError(async (req, res) => {
  let { search, limit, skip } = req.query;
  if (!limit) limit = 4;
  const resultsPerPage = parseInt(limit);
  if (!skip) skip = 0;
  const skipCount = parseInt(skip);
  let query = {};
  let count = 0;
  let products = null;

  if (search) {
    query = {
      $and: [
        { visibility: 'visible' },
        {
          $or: [
            { name: { $regex: `${search}`, $options: 'i' } },
            { itemCode: { $regex: `${search}`, $options: 'i' } },
            { itemSeries: { $regex: `${search}`, $options: 'i' } },
          ],
        },
      ],
    };
  } else {
    query = { visibility: 'visible' };
  }

  products = await Product.find(query, {
    name: 1,
    name_ar: 1,
    name_ru: 1,
    price: 1,
    slug: 1,
    badge: 1,
    discount: 1,
    thumbs: 1,
    reviews: 1,
  })
    .sort({
      createdAt: -1,
    })
    .limit(resultsPerPage)
    .skip(skipCount);

  count = await Product.find(query).countDocuments();

  res.status(200).json({
    success: true,
    count,
    limit,
    products,
  });
});
