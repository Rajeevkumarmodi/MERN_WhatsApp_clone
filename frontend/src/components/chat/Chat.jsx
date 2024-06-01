import React, { Fragment, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import ChatLeftHeader from "./ChatLeftHeader";
import SearchBox from "./SearchBox";
import Account from "./Account";
import EmptyChat from "./EmptyChat";
import Drawer from "./Drawer";
import SmallTogalModal from "./SmallTogalModal";
import { getAllUsers } from "../../api/api";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import { userContext } from "../../context/context";

function Chat() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenSmallTogalModal, setIsOpenSmallTogalModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [conversationId, setConversationId] = useState("");

  const { selectedUserForChat } = useContext(userContext);

  async function handleCallAlluser() {
    const res = await getAllUsers();

    if (!res.success) {
      toast.error(res.message);
    } else {
      setAllUsers(res.data);
    }
  }

  useEffect(() => {
    handleCallAlluser();
  }, []);

  return (
    <div className="flex w-full">
      <div className="absolute md:left-[310px] left-[200px]  top-5 z-50">
        <SmallTogalModal
          isOpen={isOpenSmallTogalModal}
          setIsOpen={setIsOpenSmallTogalModal}
          setIsOpenDrawer={setIsOpenDrawer}
        />
      </div>

      {/* left */}
      <div className="relative overflow-y-auto  w-[350px]   bg-white h-screen">
        <ChatLeftHeader
          isOpen={isOpenDrawer}
          setIsOpen={setIsOpenDrawer}
          setIsOpenSmallTogalModal={setIsOpenSmallTogalModal}
        />
        <SearchBox />

        <Conversation
          setConversationId={setConversationId}
          allUsers={allUsers}
        />

        <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
      </div>

      {/* right */}
      <div className=" md:w-[75%] w-[500px] overflow-x-auto">
        {selectedUserForChat?._id ? (
          <ChatBox conversationId={conversationId} />
        ) : (
          <EmptyChat />
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Chat;
