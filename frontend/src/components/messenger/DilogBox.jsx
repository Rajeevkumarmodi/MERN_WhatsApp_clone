import React, { useState } from "react";
import { useContext } from "react";
import Register from "./Register";
import Login from "./Login";
import { userContext } from "../../context/context";

function DilogBox() {
  const { isRegisterFormOpen, setIsRegisterFormOpen } = useContext(userContext);
  // const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(true);
  return (
    <div className=" overflow-y-auto  fixed top-[100px] inset-0  flex items-start z-[100] justify-center">
      <div className="sm:w-[90%] min-h-full  bg-white  w-full  pb-8 p-3 px-5 rounded-sm shadow-lg  relative">
        {isRegisterFormOpen ? (
          <Register setIsRegisterFormOpen={setIsRegisterFormOpen} />
        ) : (
          <Login setIsRegisterFormOpen={setIsRegisterFormOpen} />
        )}
      </div>
    </div>
  );
}

export default DilogBox;
