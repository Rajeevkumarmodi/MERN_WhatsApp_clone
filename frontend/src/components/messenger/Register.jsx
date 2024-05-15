import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import logo from "../../assets/react.svg";

function Register({ setIsRegisterFormOpen }) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    // profilePic: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  function handleFileChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setProfilePic(url);
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
    console.log(imageUrl);
  };

  return (
    <div className="inline-block relative left-[55%] translate-x-[-50%]">
      <form className="shadow-lg bg-white shadow-gray-500 rounded-lg px-[50px] py-3  flex flex-col items-center gap-3   m-auto">
        <h3 className=" font-bold text-2xl text-green-700 ">Sign up</h3>

        <div className="relative inline-block">
          <div className="w-[100px] h-[100px] overflow-hidden border-2 border-gray-400 rounded-full">
            <img
              src={image ? image : logo}
              alt="Selected"
              className="w-full h-full"
            />
          </div>
          <div className="absolute inline-block top-[75px] left-[75px]">
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            <FaCamera
              onClick={handleIconClick}
              className="text-xl cursor-pointer z-40 text-[#197461]"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border-[1px] border-gray-500 py-1 focus:outline-none rounded-md pl-2 pr-5 "
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="border-[1px] border-gray-500 py-1 focus:outline-none rounded-md pl-2 pr-5  py-1"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="about">About</label>
          <input
            type="text"
            id="about"
            className="border-[1px] border-gray-500 focus:outline-none rounded-md pl-2 pr-5  py-1"
            name="about"
            onChange={handleChange}
            value={formData.about}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            className="border-[1px] border-gray-500 focus:outline-none rounded-md pl-2 pr-5  py-1"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <p>
          I havan an account{" "}
          <span
            onClick={() => setIsRegisterFormOpen(false)}
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
        <button className="bg-[#078066] px-5 py-1 rounded-md text-white ">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Register;
