import Conversation from "../modals/conversation.modal.js";

export async function createConversation(req, res) {
  const { userId } = req.userId;
  const { receiverId } = req.body;

  if (!receiverId) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide receiver id" });
  }

  try {
    const isPresent = await Conversation.findOne({
      users: { $all: [userId, receiverId] },
    });

    if (isPresent) {
      return res.status(404).json({
        success: false,
        message: "Conversation already created",
        conversationId: isPresent._id,
      });
    }

    const newConversation = new Conversation({ users: [userId, receiverId] });

    await newConversation.save();

    return res.status(201).json({
      success: true,
      message: "Conversation is created ",
      conversationId: newConversation._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
