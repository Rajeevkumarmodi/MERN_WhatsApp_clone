import React, { Fragment, useContext, useEffect, useState } from "react";

import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";
import ChatBoxHeader from "./ChatBoxHeader";
import { getAllMessages, sendMessageApi } from "../../api/api";
import { userContext } from "../../context/context";

const bgImage =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

function ChatBox(props) {
  const [chatMessage, setChatMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [togalMessageSend, setTogalMessageSend] = useState(false);

  const { selectedUserForChat, userInfo } = useContext(userContext);

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

  async function allMessagesFun() {
    const res = await getAllMessages(props.conversationId);
    setAllMessages(res.data);
    setTogalMessageSend(!togalMessageSend);
  }

  function formateTime(time) {
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();

    return `${hours < 10 ? "0" + hours : hours} : ${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  }

  useEffect(() => {
    allMessagesFun();
  }, [props.conversationId, togalMessageSend]);

  return (
    <div className="bg-chatbox-bg bg-cover flex flex-col justify-between bg-center h-screen">
      {/* header */}
      <ChatBoxHeader setIsOpenDrawer={props.setIsOpenDrawer} />

      <div className="h-[calc(100%-50px)]  flex flex-col justify-between">
        <div className=" overflow-y-auto px-3">
          {allMessages?.map((message) => (
            <Fragment key={message._id}>
              {message.senderId !== userInfo.id ? (
                // left side
                <div className=" w-[80%] md:w-[50%]">
                  <p className="bg-gray-200 relative inline-block rounded-b-lg rounded-tr-lg pl-2 pr-[60px] py-1 mt-2">
                    {message.text}{" "}
                    <span className="ml-3 absolute right-1 bottom-0 text-nowrap">
                      {formateTime(message.createdAt)}
                    </span>
                  </p>
                </div>
              ) : (
                // right side
                <div className="w-[80%] md:w-[50%]  ml-auto text-end ">
                  <p className="bg-green-400 relative inline-block rounded-b-lg rounded-tl-lg pl-2 pr-[60px] py-1 mt-2">
                    {message.text}
                    <span className=" text-white absolute bottom-0 right-1 ml-3 text-nowrap">
                      {formateTime(message.createdAt)}
                    </span>
                  </p>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* footer */}
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
