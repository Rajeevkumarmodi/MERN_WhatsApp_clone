import React, { useEffect, useRef, useState } from "react";
import { registerFun } from "../../api/api";
import { FaCamera } from "react-icons/fa";
import logo from "../../assets/react.svg";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Spinner";

function Register({ setIsRegisterFormOpen }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState({
    url: null,
    path: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
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
    setImage({
      url: url,
      path: e.target.files[0],
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();

    const { name, email, password, about } = formData;

    if (!name || !email || !password || !image.path) {
      toast.error("All fields are Required ");
    } else {
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("email", email);
      newFormData.append("password", password);
      newFormData.append("about", about);
      newFormData.append("profilePic", image.path);

      setIsLoading(true);
      const res = await registerFun(newFormData);
      if (res.success) {
        toast.success(res.message);
        setIsRegisterFormOpen(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res.message);
      }
      console.log(res);
    }
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage({
      url: imageUrl,
      path: selectedImage,
    });
    console.log(imageUrl);
  };

  return (
    <div className="inline-block relative left-[55%] translate-x-[-50%]">
      <form
        onSubmit={handelSubmit}
        className="shadow-lg bg-white shadow-gray-500 rounded-lg px-[50px] py-3  flex flex-col items-center gap-3   m-auto"
      >
        <h3 className=" font-bold text-2xl text-green-700 ">Sign up</h3>

        <div className="relative inline-block">
          <div className="w-[100px] h-[100px] overflow-hidden border-2 border-gray-400 rounded-full">
            <img
              src={image.url ? image.url : logo}
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
            required
            className="border-[1px] border-gray-500 py-1 focus:outline-none rounded-md pl-2 pr-5 "
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            id="emailId"
            required
            className="border-[1px] border-gray-500 py-1 focus:outline-none rounded-md pl-2 pr-5  py-1"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="aboutField">About</label>
          <input
            type="text"
            id="aboutField"
            className="border-[1px] border-gray-500 focus:outline-none rounded-md pl-2 pr-5  py-1"
            name="about"
            onChange={handleChange}
            value={formData.about}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
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
          {isLoading ? <Spinner /> : "Sign up"}
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Register;
