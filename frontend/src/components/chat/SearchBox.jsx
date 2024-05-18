import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

function SearchBox() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex relative mx-5 my-1">
      <div className="absolute top-[6px] left-2">
        <GoSearch />
      </div>
      <input
        className="rounded-md focus:outline-none pl-8 py-[2px] w-full bg-[#d2d2d3]"
        type="text"
        placeholder="Search or Start a new chat "
      />
    </div>
  );
}

export default SearchBox;
