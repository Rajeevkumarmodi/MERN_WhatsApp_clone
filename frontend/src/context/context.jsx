import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("whatsApp_token");
    localToken ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <userContext.Provider
      value={{
        isRegisterFormOpen,
        setIsRegisterFormOpen,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
