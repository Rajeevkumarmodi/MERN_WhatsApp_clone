import React, { useContext, useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { LuSave } from "react-icons/lu";

import avatar from "../../assets/avatar.png";
import { MdEdit } from "react-icons/md";
import { userContext } from "../../context/context";

function Drawer({ isOpen, setIsOpen }) {
  const { userInfo } = useContext(userContext);
  const [image, setImage] = useState(userInfo.dp);
  const [nameAndAbout, setNameAndAbout] = useState({
    name: userInfo.name,
    about: userInfo.about,
  });

  const [isClickEditIcon, setIsClickEditIcon] = useState({
    name: false,
    about: false,
  });

  function handleChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(url);
  }

  function handleChangeNameAndEmail(e) {
    const { name, value } = e.target;

    setNameAndAbout({ ...nameAndAbout, [name]: value });
  }

  function handleSaveName() {}

  function handleSaveAbout() {}

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
            {isClickEditIcon.name ? (
              <input
                autoFocus={true}
                className="border-[1.5px] border-gray-200 w-[90%] rounded-md px-2"
                value={nameAndAbout.name}
                onChange={handleChangeNameAndEmail}
                type="text"
                name="name"
              />
            ) : (
              <p>{userInfo.name}</p>
            )}

            {isClickEditIcon.name ? (
              <LuSave onClick={handleSaveName} className="cursor-pointer" />
            ) : (
              <MdEdit
                onClick={() => setIsClickEditIcon({ name: true, about: false })}
                className="text-[#208f77] cursor-pointer"
              />
            )}
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
            {isClickEditIcon.about ? (
              <input
                autoFocus={true}
                className="border-[1.5px] border-gray-200 w-[90%] rounded-md px-2"
                value={nameAndAbout.about}
                onChange={handleChangeNameAndEmail}
                type="text"
                name="about"
              />
            ) : (
              <p>{userInfo.about}</p>
            )}
            {isClickEditIcon.status ? (
              <LuSave onClick={handleSaveStatus} className="cursor-pointer" />
            ) : (
              <MdEdit
                onClick={() =>
                  setIsClickEditIcon({ name: false, status: true })
                }
                className="text-[#208f77] cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
