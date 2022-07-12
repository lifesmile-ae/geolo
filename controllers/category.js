import Category from '../models/category';
import Product from '../models/product';
import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import slugify from 'slugify';
import { compareSync } from 'bcryptjs';

const getCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      arname: cate.arname,
      runame: cate.runame,
      slug: cate.slug,
      categoryImageMain: cate.categoryImageMain,
      categoryImageSecond: cate.categoryImageSecond,
      categoryIcon: cate.categoryIcon,
      children: getCategories(categories, cate._id),
    });
  }
  return categoryList;
};

export const getCategory = catchAsyncError(async (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = getCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
});

export const singleCategory = catchAsyncError(async (req, res, next) => {
  try {
    let { search, limit, sub, minPrice, maxPrice, except } = req.query;
    if (!limit) limit = 20;
    if (!minPrice) minPrice = 1;
    if (!maxPrice) maxPrice = 100000;

    const resultsPerPage = parseInt(limit);

    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);

    let skipCount = 0;
    let page = 1;
    let count = 0;
    let query = {};
    let getProduct = null;
    let children = null;

    if (req.query.page) {
      page = isNaN(parseInt(req.query.page)) ? 1 : parseInt(req.query.page);
      page = page < 0 ? page * -1 : page;
      skipCount = (page - 1) * resultsPerPage;
    }

    const parent = await Category.find({ slug: req.query.slug });

    children = await Category.find({ parentId: parent[0]._id });

    if (sub === undefined || sub === '') {
      query = {
        $and: [
          { visibility: 'visible' },
          { categories: { $in: children.map((cat) => cat._id) } },
          { price: { $gt: min } },
          { price: { $lt: max } },
        ],
      };
    } else {
      query = {
        $and: [
          { visibility: 'visible' },
          { categories: sub },
          { price: { $gt: min } },
          { price: { $lt: max } },
        ],
      };
    }

    if (except) {
      query.$and.push({ slug: { $not: { $in: except } } });
    }

    getProduct = await Product.find(query)
      .select(
        '_id name name_ar name_ru discount price slug badge thumbs reviews'
      )
      .sort({
        createdAt: -1,
      })
      .limit(resultsPerPage)
      .skip(skipCount);

    if (getProduct != null && getProduct.length > 0) {
      count = await Product.find(query).countDocuments();
      return res.status(200).send({
        status: 'success',
        resultsPerPage,
        currentPage: page,
        totalPage: Math.ceil(count / resultsPerPage),
        totalDocuments: count,
        children,
        getProduct,
      });
    } else {
      return res.status(200).send({
        status: 'no_data',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});
