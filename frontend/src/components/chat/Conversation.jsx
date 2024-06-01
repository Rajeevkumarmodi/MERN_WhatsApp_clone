import React, { Fragment, useContext } from "react";
import Account from "./Account";
import { userContext } from "../../context/context";

function Conversation({ allUsers, setConversationId }) {
  const { userInfo } = useContext(userContext);
  return (
    <div>
      {allUsers.map((user) => (
        <Fragment key={user._id}>
          {userInfo?.id != user._id && (
            <Account setConversationId={setConversationId} user={user} />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Conversation;
