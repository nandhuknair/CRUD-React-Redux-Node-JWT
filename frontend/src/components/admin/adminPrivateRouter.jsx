import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");

  const isAuthenticated = token ? true : false;
  const isAdmin = admin ? true : false

  return isAuthenticated && isAdmin ? element : <Navigate to="/admin" />;
};

export default AdminPrivateRoute;