import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user.name);

  const data = {
    name:"user"
  }

  const handleUser = () => {
    dispatch(login(data));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4 flex justify-center">
          This is a home page bruh!
        </h1>
        <h1>{user ? user : "no user"}</h1>
        <button onClick={handleUser}> Change to user </button>
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Random AI-generated"
            className="h-screen w-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
