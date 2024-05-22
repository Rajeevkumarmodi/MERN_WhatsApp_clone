import React, { useContext, useState } from "react";
import Messenger from "./components/messenger/Messenger";
import DilogBox from "./components/messenger/DilogBox";
import Chat from "./components/chat/Chat";
import UserContext, { userContext } from "./context/context";

function App() {
  const { isLogin } = useContext(userContext);
  return (
    <div className="">
      {isLogin ? (
        <Chat />
      ) : (
        <>
          <DilogBox />
          <Messenger />
        </>
      )}
    </div>
  );
}

export default App;
