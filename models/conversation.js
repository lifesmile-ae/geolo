import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema);
