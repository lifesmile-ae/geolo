import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter category name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
    categoryIcon: { type: String },
    categoryImageMain: { type: String },
    categoryImageSecond: { type: String },
    arname: {
      type: String,
    },
    runame: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema);
