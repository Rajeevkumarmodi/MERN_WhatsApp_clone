import React, { Fragment, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import ChatBoxHeader from "./ChatBoxHeader";
import { getAllMessages, sendFileApi, sendMessageApi } from "../../api/api";
import { userContext } from "../../context/context";
import Spinner from "../Spinner";

import pdfImg from "../../assets/pdf_img.png";

// import festivalData from "../festivalData";

const bgImage =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

function ChatBox(props) {
  const [chatMessage, setChatMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [togalMessageSend, setTogalMessageSend] = useState(false);
  const [sendSelectedFile, setSendSelectedFile] = useState({
    url: "",
    fileType: "",
    file: "",
  });

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
      setTogalMessageSend(!togalMessageSend);
    }
  }

  async function allMessagesFun() {
    const res = await getAllMessages(props.conversationId);
    setAllMessages(res.data);
  }

  function formateTime(time) {
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();

    return `${hours < 10 ? "0" + hours : hours} : ${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  }

  async function sendFile() {
    const formData = new FormData();
    formData.append("conversationId", props.conversationId);
    formData.append("receiverId", selectedUserForChat._id);
    formData.append("text", "");
    formData.append("type", "file");
    formData.append("file", sendSelectedFile.file);

    const res = await sendFileApi(formData);
    if (res.success) {
      setTogalMessageSend(!togalMessageSend);
      setSendSelectedFile({
        url: "",
        fileType: "",
        file: "",
      });
    }
    console.log(res);
  }

  // handlefilechange function
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.name.split(".")[1];
    if (selectedFile.size <= 614400) {
      if (
        fileType == "pdf" ||
        fileType == "png" ||
        fileType == "jpeg" ||
        fileType == "jpg"
      ) {
        const url = URL.createObjectURL(e.target.files[0]);
        setSendSelectedFile({
          url,
          fileType,
          file: selectedFile,
        });
        sendFile();
      } else {
        toast.error(
          "Plese make sure your file extension is .pdf , .png , .jpeg , .jpg"
        );
      }
    } else {
      toast.error("Your file is so large plaese send file less then 600kb");
    }
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
                  {message.text ? (
                    <p className="bg-gray-200 relative inline-block rounded-b-lg rounded-tr-lg pl-2 pr-[60px] py-1 mt-2">
                      {message?.text}{" "}
                      <span className="ml-3 absolute right-1 bottom-0 text-nowrap">
                        {formateTime(message.createdAt)}
                      </span>
                    </p>
                  ) : message.file.split(".").pop() === "pdf" ? (
                    <div className="inline-block relative">
                      <img
                        className=" my-2 w-[150px] max-h-[200px] object-cover"
                        src={pdfImg}
                        alt="pdf image"
                      />
                      <p className="absolute bottom-2  h-7 w-[135px] bg-gray-300 "></p>
                      <span className="absolute bottom-3 right-6">
                        {formateTime(message.createdAt)}
                      </span>
                      <a href={message.file}>
                        <MdDownload className="absolute bottom-2 text-xl" />
                      </a>
                    </div>
                  ) : (
                    <div className=" inline-block relative">
                      <img
                        className="shadow-md shadow-gray-400 rounded-lg p-1 my-2 w-[150px] max-h-[200px] object-cover"
                        src={message.file}
                      />
                      <span className="bg-gray-400 bg-opacity-60 px-2  rounded-lg  absolute right-2 bottom-3 text-gray-100">
                        {formateTime(message.createdAt)}
                      </span>
                      <a href={message.file} download={true}>
                        <MdDownload className="absolute bottom-3 text-2xl left-2 cursor-pointer" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // right side
                <div className="w-[80%] md:w-[50%]  ml-auto text-end ">
                  {message.text ? (
                    <p className="bg-green-400 relative inline-block rounded-b-lg rounded-tl-lg pl-2 pr-[60px] py-1 mt-2">
                      {message.text}
                      <span className=" text-white absolute bottom-0 right-1 ml-3 text-nowrap">
                        {formateTime(message.createdAt)}
                      </span>
                    </p>
                  ) : message.file.split(".").pop() === "pdf" ? (
                    <div className="inline-block relative">
                      <img
                        className=" my-2 w-[150px] max-h-[200px] object-cover ml-auto"
                        src={pdfImg}
                        alt="pdf image"
                      />
                      <p className="absolute bottom-2  h-7 w-[135px] bg-gray-300 "></p>
                      <span className="absolute bottom-3 right-6">
                        {formateTime(message.createdAt)}
                      </span>
                      <a href={message.file}>
                        <MdDownload className="absolute bottom-2 text-xl" />
                      </a>
                    </div>
                  ) : (
                    <div className=" inline-block relative">
                      <img
                        className="shadow-md shadow-gray-400 rounded-lg p-1 my-2 ml-auto w-[150px] max-h-[200px] object-cover"
                        src={message.file}
                      />
                      <span className="bg-gray-400 bg-opacity-60 px-2  rounded-lg  absolute right-2 bottom-3 text-gray-100">
                        {formateTime(message.createdAt)}
                      </span>
                      <a href={message.file} download={true}>
                        <MdDownload className="absolute bottom-3 text-2xl left-2 cursor-pointer" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}

          <div className=" relative flex justify-center">
            {sendSelectedFile.url && (
              <>
                <img
                  className="w-[150px] max-h-[200px] object-cover"
                  src={
                    sendSelectedFile.fileType == "pdf"
                      ? pdfImg
                      : sendSelectedFile.url
                  }
                  alt="select file"
                />
                <div className="absolute w-[150px] h-[100%]  bg-gray-300 bg-opacity-65">
                  <div className="relative top-[50%] pl-[30px]">
                    <Spinner />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* footer */}
        <footer className="bg-gray-300 md:px-10 px-4  flex items-center justify-between w-[100%] h-[48px]">
          <div className="flex items-center gap-2">
            <div>
              <label htmlFor="attechFile">
                <GrAttachment className="text-xl cursor-pointer" />
              </label>
              <input
                onChange={handleFileChange}
                className="hidden"
                type="file"
                name=""
                id="attechFile"
              />
            </div>
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
      <Toaster />
    </div>
  );
}

export default ChatBox;
