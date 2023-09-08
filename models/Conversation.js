const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    updated_time: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
