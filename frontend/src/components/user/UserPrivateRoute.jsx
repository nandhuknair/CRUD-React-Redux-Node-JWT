import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../Redux/userSlice";
import axios from "axios";

const UserPrivateRoute = ({ element }) => {

  const [data,setData] = useState({})

  const dispatch = useDispatch()

  dispatch(login(data))

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  const isAuthenticated = token ? true : false;
  const isUser = user ? true : false


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      try {
        const authUser = await axios.get("http://localhost:3000/user/home");
        console.log(authUser.data);
        setData(authUser.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return isAuthenticated && isUser ? element : <Navigate to="/login" />;
};

export default UserPrivateRoute;
