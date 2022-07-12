import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation',
      },
    ],
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', messageSchema);
