import React, { useState } from "react";
import ChatLeftHeader from "./ChatLeftHeader";
import SearchBox from "./SearchBox";
import Account from "./Account";
import EmptyChat from "./EmptyChat";
import Drawer from "./Drawer";

function Chat() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <div className="flex w-full">
      {/* left */}
      <div className="overflow-y-auto  w-[350px]  bg-white h-screen">
        <ChatLeftHeader isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
        <SearchBox />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
      </div>
      {/* right */}
      <div className=" md:w-[75%] w-[500px] overflow-x-auto">
        <EmptyChat />
      </div>
    </div>
  );
}

export default Chat;
