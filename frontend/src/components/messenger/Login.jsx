import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

function Login({ setIsRegisterFormOpen }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="inline-block relative left-[50%] translate-x-[-50%] ">
      <form className="shadow-lg shadow-gray-500 rounded-lg px-[40px] py-3  flex flex-col items-center gap-3 m-auto">
        <h3 className=" font-bold text-2xl text-green-700 mb-[-10px]">Login</h3>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="border-[1px] border-gray-500 focus:outline-none rounded-md pl-2 pr-5 py-1"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            className="border-[1px] border-gray-500 focus:outline-none rounded-md pl-2 pr-5 py-1"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        <p>
          I dont't have an account{" "}
          <span
            onClick={() => setIsRegisterFormOpen(true)}
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>
        <button className="bg-[#078066] w-full flex items-center justify-center gap-1 px-5 py-1 rounded-md text-white ">
          <IoMdLogIn />
          Login
        </button>

        <p>OR</p>

        <button className="bg-[#078066] w-full flex items-center justify-center gap-1 px-5 py-1 rounded-md text-white ">
          <FaGoogle />
          Login With Google
        </button>
      </form>
    </div>
  );
}

export default Login;
