import mongoose from 'mongoose';

const smilePointSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    currentPoint: {
      type: Number,
      default: 100,
    },
    pointsLog: [
      {
        orderId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Order',
        },
        message: {
          type: String,
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SmilePoint ||
  mongoose.model('SmilePoint', smilePointSchema);
