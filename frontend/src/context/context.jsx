import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const localToken = localStorage.getItem("whatsApp_token");
    localToken ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem("whatsApp_token");
    if (localToken) {
      const info = JSON.parse(localStorage.getItem("whatsApp_userInfo"));
      setUserInfo(info);
    } else {
      setUserInfo(null);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        isRegisterFormOpen,
        setIsRegisterFormOpen,
        isLogin,
        setIsLogin,
        userInfo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
