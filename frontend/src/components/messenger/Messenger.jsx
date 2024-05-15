import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import DilogBox from "./DilogBox";

function Messenger() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <div className="h-[150px] bg-[#00A783]">
        <div className="flex items-center gap-1 relative top-[40px] left-[70px]">
          <FaWhatsapp className="text-white text-4xl" />
          <p className="text-white">WHATSAPP WEB</p>
        </div>
      </div>
      <DilogBox />
    </div>
  );
}

export default Messenger;
