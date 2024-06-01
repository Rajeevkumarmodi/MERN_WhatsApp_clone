import Conversation from "../modals/conversation.modal.js";
import Message from "../modals/message.modal.js";

export async function sendNewMessage(req, res) {
  const { conversationId, receiverId, type, text } = req.body;
  const { userId } = req.userId;

  try {
    const newMessage = new Message({
      conversationId,
      receiverId,
      type,
      text,
      senderId: userId,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { message: text },
    });

    await newMessage.save();

    return res
      .status(201)
      .json({ success: true, message: "message send successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
