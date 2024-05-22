import { createContext, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  return (
    <userContext.Provider
      value={{
        isRegisterFormOpen,
        setIsRegisterFormOpen,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
