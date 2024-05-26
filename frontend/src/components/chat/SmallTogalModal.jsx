import React, { useState, useRef, useEffect, memo } from "react";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import { RxAvatar } from "react-icons/rx";

const SmallTogalModal = ({ isOpen, setIsOpen, setIsOpenDrawer }) => {
  const modalRef = useRef();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function handleLogout() {}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="relative" ref={modalRef}>
      {isOpen && (
        <div className=" w-[150px] bg-white rounded-md shadow-md flex">
          <div className=" w-full px-3 py-5 ">
            <ul>
              <li
                onClick={() => setIsOpenDrawer(true)}
                className="flex items-center cursor-pointer gap-2"
              >
                <CgProfile /> <p>Profile</p>
              </li>
              <li className="flex cursor-pointer items-center gap-2 text-red-700">
                <IoIosLogOut /> <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallTogalModal;
