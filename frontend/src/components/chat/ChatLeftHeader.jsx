import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import avatar from "../../assets/avatar.png";
function ChatLeftHeader({ isOpen, setIsOpen }) {
  return (
    <div className="flex items-center justify-between px-8 py-1 bg-[#d2d2d3]">
      <img
        onClick={() => setIsOpen(true)}
        className="w-[40px] cursor-pointer "
        src={avatar}
        alt="dp"
      />
      <div className="flex items-center gap-2">
        <MdMessage className="text-xl cursor-pointer" />
        <CiMenuKebab className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatLeftHeader;
