import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import avatar from "../../assets/avatar.png";
import { MdEdit } from "react-icons/md";

function Drawer({ isOpen, setIsOpen }) {
  const [image, setImage] = useState("");

  function handleChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(url);
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen ease-in-out duration-500 overflow-y-auto transition-transform bg-gray-100 w-80 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-left-label"
      >
        <div className="bg-[#09a885] text-white flex items-end gap-4 h-[80px] p-4">
          <FaArrowLeft
            onClick={() => toggleDrawer(false)}
            className="font-bold cursor-pointer relative bottom-1"
          />
          <p className="font-bold">Profile</p>
        </div>

        <div className="relative flex justify-center py-4">
          <img
            className=" w-[120px] h-[120px] rounded-full"
            src={image ? image : avatar}
            alt="dp"
          />
          <div>
            <label htmlFor="image">
              <FaCamera className=" text-[#26a68a] text-xl cursor-pointer absolute bottom-6 right-[33%] " />
            </label>
            <input
              onChange={handleChange}
              className="hidden"
              type="file"
              id="image"
            />
          </div>
        </div>

        <div className="bg-white my-4  py-2 px-3">
          <p>Your name</p>
          <div className="flex mt-3 items-center justify-between">
            <p>Rajeev Modi</p>
            <MdEdit className="text-[#208f77] cursor-pointer" />
          </div>
        </div>

        <div>
          <p className="text-gray-500 px-3 py-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            harum.
          </p>
        </div>

        <div className="bg-white mt-4 py-2 px-3">
          <p>About</p>
          <div className="flex mt-3 items-center justify-between">
            <p>Nothing to my about👍</p>
            <MdEdit className="text-[#208f77] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
