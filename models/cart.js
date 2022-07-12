import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
      {
        name: { type: String, required: true },
        slug: {
          type: String,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
        productCode: {
          type: Array,
        },
        discountedPrice: {
          type: String,
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        productQuantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['completed', 'uncompleted'],
      default: 'uncompleted',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
