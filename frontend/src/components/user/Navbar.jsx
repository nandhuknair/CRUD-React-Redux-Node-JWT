import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../../Redux/userSlice";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {

  const user = useSelector((state) => state.user.user.name);
  console.log(user, "From header page !!!!!!!! suiiiiiiiiiiii");


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };


  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <a href="/" className="hover:text-yellow-500">
            MyApp
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </a>
          <a href="/profile" className="text-gray-300 hover:text-white">
            Profile
          </a>
          <div className="text-gray-300">
            <span>{user ? user : "Guest"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
