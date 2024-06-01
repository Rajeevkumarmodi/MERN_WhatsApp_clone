import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: Array,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
