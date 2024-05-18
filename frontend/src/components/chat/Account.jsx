import React from "react";
import avatar from "../../assets/avatar.png";

function Account() {
  return (
    <div className="mx-5  flex gap-2 my-4">
      <img
        className="w-[40px] cursor-pointer"
        src={avatar}
        alt="avatar image"
      />
      <p className="cursor-pointer">Rajeev modi</p>
    </div>
  );
}

export default Account;
