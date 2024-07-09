import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  const isAuthenticated = token ? true : false;
  const isUser = user ? true : false

  return isAuthenticated && isUser ? element : <Navigate to="/login" />;
};

export default UserPrivateRoute;
