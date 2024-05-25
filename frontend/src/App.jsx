import React, { useContext, useState } from "react";
import Messenger from "./components/messenger/Messenger";
import DilogBox from "./components/messenger/DilogBox";
import Chat from "./components/chat/Chat";
import UserContext, { userContext } from "./context/context";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const { isLogin } = useContext(userContext);

  return (
    <div className="">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
        {isLogin ? (
          <Chat />
        ) : (
          <>
            <DilogBox />
            <Messenger />
          </>
        )}
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
