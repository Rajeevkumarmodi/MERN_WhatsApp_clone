import React from "react";
import ChatLeftHeader from "./ChatLeftHeader";
import SearchBox from "./SearchBox";
import Account from "./Account";
import EmptyChat from "./EmptyChat";

function Chat() {
  return (
    <div className="flex w-full">
      {/* left */}
      <div className="overflow-y-auto  w-[350px]  bg-white h-screen">
        <ChatLeftHeader />
        <SearchBox />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
      </div>
      {/* right */}
      <div className=" md:w-[75%] w-[500px] overflow-x-auto">
        <EmptyChat />
      </div>
    </div>
  );
}

export default Chat;
