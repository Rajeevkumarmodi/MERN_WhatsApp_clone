import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { userContext } from "../../context/context";
import { createConversationApi } from "../../api/api";

function Account(props) {
  const { setSelectedUserForChat } = useContext(userContext);

  function clickSingleUser() {
    setSelectedUserForChat(props.user);
    createConversation();
  }

  async function createConversation() {
    const res = await createConversationApi(props.user._id);
    props.setConversationId(res.conversationId);
    console.log(res);
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
