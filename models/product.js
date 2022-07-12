import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      unique: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    name_ar: {
      type: String,
      trim: true,
      unique: true,
      default: false,
    },
    name_ru: {
      type: String,
      trim: true,
      unique: true,
      default: false,
    },
    slug: {
      type: String,
      required: [true, 'Unable to generate Slug'],
      unique: true,
    },
    visibility: {
      type: String,
      enum: ['visible', 'hidden'],
      default: 'visible',
    },
    badge: {
      type: String,
      trim: true,
    },
    sku: {
      type: Number,
      required: [true, 'Please enter product sku'],
    },
    discount: {
      type: Number,
      default: false,
    },
    discountDuration: {
      type: Date,
    },
    itemCode: {
      type: Array,
    },
    attributes: {
      type: Array,
    },
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
    ],
    thumbs: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    previewImages: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    excerpt: {
      type: String,
      default: false,
    },
    excerpt_ar: {
      type: String,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'Please Enter Product description'],
    },
    description_ar: {
      type: String,
      default: false,
    },
    shortdescription: {
      type: String,
      required: [true, 'Please Enter Short description'],
    },
    reviews: [
      {
        fullname: {
          type: String,
        },
        email: {
          type: String,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
        verified: {
          type: Boolean,
          default: false,
        },
      },
    ],
    shortdescription_ar: {
      type: String,
      default: false,
    },
    price: {
      type: Number,
      default: false,
    },
    stock: {
      type: Number,
      default: false,
    },
    variationtype: {
      type: String,
      required: [true, 'Variation Type is not selected'],
    },
    variations: [
      {
        default: false,
        color: {
          name: {
            type: String,
          },
          thumbs: [
            {
              url: {
                type: String,
              },
            },
          ],
          code: {
            type: String,
          },
          stock: {
            type: String,
          },
          price: {
            type: Number,
          },
          itemCode: {
            type: String,
          },
          default: false,
        },
        sizes: [
          {
            name: {
              type: String,
              required: true,
            },
            stock: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            itemCode: {
              type: String,
              default: false,
            },
            default: false,
          },
        ],
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
