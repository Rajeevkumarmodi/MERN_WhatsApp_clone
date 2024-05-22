import React from "react";
import Messenger from "./components/messenger/Messenger";
import DilogBox from "./components/messenger/DilogBox";
import Chat from "./components/chat/Chat";
import UserContext from "./context/context";

function App() {
  return (
    <div className="">
      <UserContext>
        <DilogBox />
        <Messenger />
        {/* <Chat /> */}
      </UserContext>
    </div>
  );
}

export default App;
