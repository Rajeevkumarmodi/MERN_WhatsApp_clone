import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { userContext } from "../../context/context";

function Account(props) {
  const { setSelectedUserForChat } = useContext(userContext);

  function clickSingleUser() {
    setSelectedUserForChat(props.user);
  }

  return (
    <div onClick={clickSingleUser} className="mx-5  flex gap-2 my-4">
      <img
        className="w-[40px] h-[40px] rounded-full cursor-pointer"
        src={props.user?.profilePic ? props.user?.profilePic : avatar}
        alt="avatar image"
      />
      <p className="cursor-pointer">{props.user?.name}</p>
    </div>
  );
}

export default Account;
