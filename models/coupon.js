import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    discount: {
      type: Number,
    },
    device: {
      type: Array,
    },
    code: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
