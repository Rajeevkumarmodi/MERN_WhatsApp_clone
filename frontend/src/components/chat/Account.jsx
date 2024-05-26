import React from "react";
import avatar from "../../assets/avatar.png";

function Account(props) {
  return (
    <div className="mx-5  flex gap-2 my-4">
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
