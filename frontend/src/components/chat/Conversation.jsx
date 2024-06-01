import React, { Fragment, useContext } from "react";
import Account from "./Account";
import { userContext } from "../../context/context";

function Conversation({ allUsers }) {
  const { userInfo } = useContext(userContext);
  return (
    <div>
      {allUsers.map((user) => (
        <Fragment key={user._id}>
          {userInfo?.id != user._id && <Account user={user} />}
        </Fragment>
      ))}
    </div>
  );
}

export default Conversation;
