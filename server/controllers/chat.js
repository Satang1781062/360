const ChatMessage = require('../models/Chat');
const User = require('../models/Chat')

exports.sendMessage = async (req, res) => {
    try {
      const { sender, recipient, message, respondedBy } = req.body;
      const newMessage = new ChatMessage({ sender, recipient, message, respondedBy });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getMessages = async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await ChatMessage.find({
        $or: [{ sender: userId }, { recipient: userId }],
      }).sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getUserChats = async (req, res) => {
    try {
      const messages = await ChatMessage.aggregate([
        {
          $match: { recipient: req.user._id }
        },
        {
          $group: {
            _id: "$sender",
            messages: { $push: "$$ROOT" }
          }
        }
      ]);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    await ChatMessage.findByIdAndUpdate(messageId, { read: true });
    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


