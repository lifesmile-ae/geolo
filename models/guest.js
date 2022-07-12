import mongoose from 'mongoose';
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const guestSchema = new mongoose.Schema({
  customer: {
    type: String,
    unique: true,
  },
  language: {
    type: String,
    default: 'en',
    enum: {
      values: ['en', 'ar', 'ru'],
    },
  },
  country: {
    type: String,
  },
  device: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

guestSchema.plugin(autoIncrement.plugin, {
  model: 'Guest',
  field: 'customer',
  startAt: 10000,
  incrementBy: 1,
});

export default mongoose.models.Guest || mongoose.model('Guest', guestSchema);
