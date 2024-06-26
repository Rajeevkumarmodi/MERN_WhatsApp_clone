import React, { useContext, useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../../assets/avatar.png";
import { MdEdit } from "react-icons/md";
import { userContext } from "../../context/context";
import { updateAbout, updateName } from "../../api/api";

function Drawer({ isOpen, setIsOpen, userData, isReadOnly }) {
  const { userInfo } = useContext(userContext);
  const [image, setImage] = useState(userInfo?.dp);
  const [nameAndAbout, setNameAndAbout] = useState({
    name: userInfo?.name,
    about: userInfo?.about,
  });

  const [isClickEditIcon, setIsClickEditIcon] = useState({
    name: false,
    about: false,
  });

  const { setUserInfo } = useContext(userContext);

  function handleChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(url);
  }

  function handleChangeNameAndAbout(e) {
    const { name, value } = e.target;

    setNameAndAbout({ ...nameAndAbout, [name]: value });
  }

  async function handleSaveName() {
    setIsClickEditIcon({ name: false, about: false });
    const res = await updateName({ name: nameAndAbout.name });
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      localStorage.setItem("whatsApp_userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);
    } else {
      toast.error(res.message);
    }
  }

  async function handleSaveAbout() {
    setIsClickEditIcon({ name: false, about: false });
    const res = await updateAbout({ about: nameAndAbout.about });
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      localStorage.setItem("whatsApp_userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);
    } else {
      toast.error(res.message);
    }
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen ease-in-out duration-500 overflow-y-auto transition-transform bg-gray-100 w-[350px] ${
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
            src={userData?.profilePic ? userData?.profilePic : avatar}
            alt="dp"
          />
          <div className={`${isReadOnly ? "hidden" : "block"}`}>
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
          {/* if isReadOnly is true then show this div otherwise hidden */}

          <div className={`${isReadOnly ? "block" : "hidden"}`}>
            <p>{userData?.name}</p>
          </div>

          {/* if isReadOnly is false then show this div otherwise hidden */}
          <div
            className={`flex mt-3 items-center justify-between ${
              isReadOnly ? "hidden" : "block"
            }`}
          >
            {isClickEditIcon.name ? (
              <input
                autoFocus={true}
                className="border-[1.5px] border-gray-200 w-[90%] rounded-md px-2"
                value={nameAndAbout.name}
                onChange={handleChangeNameAndAbout}
                type="text"
                name="name"
              />
            ) : (
              <p>{userInfo?.name}</p>
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

          {/* if isReadOnly is true then show this div otherwise hidden */}

          <div className={`${isReadOnly ? "block" : "hidden"}`}>
            <p>{userData?.about}</p>
          </div>

          {/* if isReadOnly is false then show this div otherwise hidden */}

          <div
            className={`flex mt-3 items-center justify-between ${
              isReadOnly ? "hidden" : "block"
            }`}
          >
            {isClickEditIcon.about ? (
              <input
                autoFocus={true}
                className="border-[1.5px] border-gray-200 w-[90%] rounded-md px-2"
                value={nameAndAbout.about}
                onChange={handleChangeNameAndAbout}
                type="text"
                name="about"
              />
            ) : (
              <p>{userInfo?.about}</p>
            )}
            {isClickEditIcon.about ? (
              <LuSave onClick={handleSaveAbout} className="cursor-pointer" />
            ) : (
              <MdEdit
                onClick={() => setIsClickEditIcon({ name: false, about: true })}
                className="text-[#208f77] cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Drawer;
