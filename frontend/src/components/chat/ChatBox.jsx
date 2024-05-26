import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";

const bgImage =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

function ChatBox() {
  return (
    <div className="bg-chatbox-bg bg-cover flex flex-col justify-between bg-center h-screen">
      {/* header */}
      <header className="bg-gray-300 md:px-8 px-4 flex items-center justify-between w-full h-[48px]">
        {/* <div className=""> */}
        <RxAvatar className="text-2xl cursor-pointer" />
        <div className="flex items-center">
          <CiSearch className="text-2xl cursor-pointer" />
          <CiMenuKebab className="text-2xl cursor-pointer" />
        </div>
        {/* </div> */}
      </header>

      <div className="h-[calc(100%-50px)]  flex flex-col justify-between">
        <div className=" overflow-y-auto"></div>
        <footer className="bg-gray-300 md:px-10 px-4  flex items-center justify-between w-full h-[48px]">
          <div className="flex items-center gap-2">
            <GrAttachment className="text-xl cursor-pointer" />
            <textarea
              className="outline-none bg-gray-300 w-[40vw] max-h-[40px]"
              name=""
              id=""
              placeholder="Type a message"
            ></textarea>
          </div>
          <div className="flex gap-2">
            <IoMdSend className="text-2xl cursor-pointer" />
            <CiMicrophoneOn className="text-2xl cursor-pointer" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatBox;
