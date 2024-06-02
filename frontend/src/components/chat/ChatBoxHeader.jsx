import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { userContext } from "../../context/context";
import avatar from "../../assets/avatar.png";

function ChatBoxHeader({ setIsOpenDrawer }) {
  const { selectedUserForChat } = useContext(userContext);
  return (
    <header className="bg-gray-300 md:px-8 px-4 flex items-center justify-between w-full h-[48px]">
      <div
        onClick={() => setIsOpenDrawer(true)}
        className="flex gap-1 cursor-pointer"
      >
        {selectedUserForChat?.profilePic ? (
          <img
            className="w-10 h-10 rounded-full"
            src={
              selectedUserForChat.profilePic
                ? selectedUserForChat.profilePic
                : avatar
            }
            alt="prfile pic"
          />
        ) : (
          <RxAvatar className="text-2xl cursor-pointer" />
        )}
        <p>Online</p>
      </div>

      <div className="flex items-center">
        <CiSearch className="text-2xl cursor-pointer" />
        <CiMenuKebab className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
}

export default ChatBoxHeader;
