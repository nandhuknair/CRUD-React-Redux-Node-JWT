import React, { useState } from "react";
import LoadingSpinner from "../user/LoadingSpinner";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Redux/adminSlice";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log(password);
    e.preventDefault();
    let errors = {};
    if (!email) errors.email = "Email is required*";
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter valid email*";
    }
    if (password.length < 2) errors.password = "Enter valid password*";
    setErrors(errors);
    if (Object.keys(errors).length > 0) return false;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/admin/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("isAdmin", response.data.admin.isAdmin);
        dispatch(adminLogin(response.data.admin));
        window.location.href = "/admin/dashboard";
        toast.success(
          `Hello ${response.data.admin.name} successfully loggedin`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex h-screen">
        <div className="flex flex-col justify-center px-24 h-full w-full md:w-1/2 lg:w-2/3 lg:ml-36">
          <h1 className="text-gray-600 font-bold text-3xl tracking-wider">
            ADMIN LOGIN
          </h1>

          <form
            className="flex flex-col w-full lg:w-10/12 mt-20"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="text-gray-400 tracking-wide">
              Email*
            </label>
            <input
              type="email"
              className="border mt-4 mb-5 py-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-xl mb-4">{errors.email}</p>
            )}

            <label htmlFor="password" className="text-gray-400 tracking-wide">
              Password*
            </label>
            <input
              type="password"
              className="border mt-4 py-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-400 text-xl mt-3">{errors.password}</p>
            )}

            <div className="flex mt-4">
              <input type="checkbox" />
              <p className="px-2 tracking-wide text-gray-400">Remember Me</p>
            </div>
            <div className="flex justify-center"></div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-fuchsia-500 hover:bg-fuchsia-700 py-5 w-full rounded-md tracking-wide 
            text-white font-bold text-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:flex flex-col h-full w-1/2 lg:w-1/3 items-center justify-center">
          <img
            src="/assets/pexels-soloman-soh-674993-1557183.jpg"
            alt="login-bg"
            className="h-full relative"
          />
          <h1 className="text-black absolute">Hey welcome back</h1>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
