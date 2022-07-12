import Conversation from '../models/conversation';
import Message from '../models/message';
import catchAsyncError from '../middlewares/catchAsyncError';

export const createConversation = catchAsyncError(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    type: req.body.type,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export const getConversation = catchAsyncError(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.query.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export const createMessage = catchAsyncError(async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const getMessages = catchAsyncError(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.query.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const updateConversationType = catchAsyncError(async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      req.body.id,
      { type: req.body.type },
      { new: true }
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});
