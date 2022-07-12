import mongoose from 'mongoose';
import validator from 'validator';

const shippingSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    fullname: {
      type: String,
    },
    country: {
      type: String,
    },
    street: {
      type: String,
      maxLength: [50, 'Your street cannot exceed 50 Character'],
    },
    apartment: {
      type: String,
      maxLength: [50, 'Your apartment cannot exceed 50 Character'],
    },
    mobile: {
      type: String,
      maxLength: [50, 'Your apartment cannot exceed 50 Character'],
      validate: [validator.isMobilePhone, 'Please enter valid mobile number'],
    },
    type: {
      type: String,
      enum: ['primary', 'secondary'],
      default: 'primary',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Shipping ||
  mongoose.model('Shipping', shippingSchema);
