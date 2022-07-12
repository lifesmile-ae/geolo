import mongoose from 'mongoose';
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    shippingid: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shipping',
    },
    invoiceNumber: { type: String },
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    cartitems: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cart',
      required: true,
    },
    smilepoints: {
      type: Number,
    },
    currency: {
      type: String,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ['ordered', 'processing', 'packed', 'shipped', 'delivered'],
          default: 'ordered',
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: [
        'pending',
        'processing',
        'refundrequested',
        'hold',
        'completed',
        'cancelled',
        'refunded',
        'failed',
      ],
    },
    paymentType: {
      type: String,
      enum: ['cash', 'stripe'],
      required: true,
    },
    discount: {
      type: String,
    },
    coupon: {
      type: String,
    },
    customerNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'invoiceNumber',
  startAt: 10000,
  incrementBy: 1,
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
