import React from "react";
import chattingImg from "../../assets/chatting_img.jpg";

function EmptyChat() {
  return (
    <div className="  flex flex-col items-center justify-center h-screen ">
      {/* <div> */}
      <img
        src={chattingImg}
        className="md:w-[40%] w-[70%]  "
        alt="chatting image"
      />
      <div className="text-center text-gray-500">
        <h3 className="text-3xl  mb-4">WhatsApp Web</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero</p>
      </div>
      {/* </div> */}
    </div>
  );
}

export default EmptyChat;
