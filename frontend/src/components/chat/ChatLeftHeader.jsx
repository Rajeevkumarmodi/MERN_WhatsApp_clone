import React, { useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import avatar from "../../assets/avatar.png";
import SmallTogalModal from "./SmallTogalModal";
import { userContext } from "../../context/context";
function ChatLeftHeader({ isOpen, setIsOpen, setIsOpenSmallTogalModal }) {
  const { userInfo } = useContext(userContext);

  return (
    <div className="flex items-center justify-between px-8 py-1 bg-[#d2d2d3]">
      <img
        onClick={() => setIsOpen(true)}
        className="w-[40px] h-[40px] rounded-full cursor-pointer "
        src={userInfo?.dp}
        alt="dp"
      />
      <div className=" relative flex items-center gap-2">
        <MdMessage className="text-xl cursor-pointer" />
        <CiMenuKebab
          onClick={() => setIsOpenSmallTogalModal(true)}
          className="text-xl cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ChatLeftHeader;
