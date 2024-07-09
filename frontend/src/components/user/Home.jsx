import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./Navbar";

const Home = () => {

  const [userName , setUserName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      try {
        const authUser = await axios.get("http://localhost:3000/user/home");
        console.log(authUser.data); 
        setUserName(authUser.data.user.name)
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch user data"); 
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <Navbar userName={userName}/>
      <h1 className="text-3xl font-bold">This is a home page bruh!</h1>
    </div>
  );
};

export default Home;
