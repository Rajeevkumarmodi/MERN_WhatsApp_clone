import React, { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { IoMdLogIn } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { googleLogin, loginWithEmailAndPassword } from "../../api/api";
import { userContext } from "../../context/context";
import Spinner from "../Spinner";

function Login({ setIsRegisterFormOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLOgin, setIsLogin } = useContext(userContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
    } else {
      setIsLoading(true);
      const res = await loginWithEmailAndPassword(formData);
      console.log(res);
      if (res.success) {
        setIsLoading(false);
        toast.success(res.message);
        setIsLogin(true);

        const info = {
          token: res.data.toast,
          dp: res.data._doc.profilePic,
          name: res.data._doc.name,
          about: res.data._doc.about,
        };

        localStorage.setItem("whatsApp_token", JSON.stringify(res.data.token));
        localStorage.setItem("whatsApp_userInfo", JSON.stringify(info));
      } else {
        setIsLoading(false);
        toast.error(res.message);
      }
    }
  }

  async function googleHandleSubmit(response) {
    const data = jwtDecode(response.credential);

    const { name, email, sub, picture } = data;

    const obj = { name: name, email, sub, profilePic: picture };

    const res = await googleLogin(obj);

    if (res.success) {
      toast.success(res.message);
      setIsLogin(true);
      const info = {
        token: res.data.toast,
        name: res.data._doc.profilePic,
        dp: res.data._doc.name,
      };

      localStorage.setItem("whatsApp_token", JSON.stringify(res.data.token));
      localStorage.setItem("whatsApp_userInfo", JSON.stringify(info));
    } else {
      setIsLoading(false);
      toast.error(res.message);
    }
  }

  return (
    <div className="inline-block relative left-[50%] translate-x-[-50%] ">
      <form
        onSubmit={handleSubmit}
        method="get"
        className="shadow-lg shadow-gray-500 rounded-lg px-[40px] py-3  flex flex-col items-center gap-3 m-auto"
      >
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
            type="password"
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
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <IoMdLogIn /> Login{" "}
            </>
          )}
        </button>

        <p>OR</p>

        <div className="w-full flex justify-center ">
          <GoogleLogin
            onSuccess={googleHandleSubmit}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </form>

      <Toaster />
    </div>
  );
}

export default Login;
