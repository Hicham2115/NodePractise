import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="bg-[#0f0b0c] w-full p-4 flex justify-between">
      <h1 className="text-[#1cb754] font-bold text-xl">ThinkBoard</h1>
      <Link to="/addNote">
        <button className="btn btn-success !bg-[#1cb754] rounded-xl">
          New Note
        </button>
      </Link>
    </div>
  );
};

export default Header;
