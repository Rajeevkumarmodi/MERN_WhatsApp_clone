import React, { useContext, useState } from "react";

import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";
import ChatBoxHeader from "./ChatBoxHeader";
import { sendMessageApi } from "../../api/api";
import { userContext } from "../../context/context";

const bgImage =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

function ChatBox(props) {
  const [chatMessage, setChatMessage] = useState("");

  const { selectedUserForChat } = useContext(userContext);

  async function handleSendMessage() {
    if (!chatMessage) return;

    const data = {
      conversationId: props.conversationId,
      text: chatMessage,
      receiverId: selectedUserForChat._id,
      type: "text",
    };

    const res = await sendMessageApi(data);
    if (res.success) {
      setChatMessage("");
    }
  }

  return (
    <div className="bg-chatbox-bg bg-cover flex flex-col justify-between bg-center h-screen">
      {/* header */}
      <ChatBoxHeader />

      <div className="h-[calc(100%-50px)]  flex flex-col justify-between">
        <div className=" overflow-y-auto"></div>
        <footer className="bg-gray-300 md:px-10 px-4  flex items-center justify-between w-[100%] h-[48px]">
          <div className="flex items-center gap-2">
            <GrAttachment className="text-xl cursor-pointer" />
            <input
              className=" outline-none bg-gray-300 md:w-[50vw] w-[40vw]"
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type a message"
            />
          </div>
          <div className="flex gap-2">
            <IoMdSend
              onClick={handleSendMessage}
              className={`${
                chatMessage ? "cursor-pointer" : "cursor-default text-gray-400"
              } text-2xl`}
            />
            <CiMicrophoneOn className="text-2xl cursor-pointer" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatBox;
