const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ChatMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    recipient: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    // Optional field to track which admin is responding
    respondedBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = ChatMessage = mongoose.model("chatmessages", ChatMessageSchema);
