import React from "react";
import Messenger from "./components/messenger/Messenger";
import DilogBox from "./components/messenger/DilogBox";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div className="">
      <DilogBox />
      <Messenger />
      {/* <Chat /> */}
    </div>
  );
}

export default App;
