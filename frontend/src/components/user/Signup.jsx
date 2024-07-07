import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const errors = {};
    if (!formData.userName) errors.userName = "Username is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number is invalid";
    }
    if (!formData.password) errors.password = "Password is required";
    if (!formData.profileImage)
      errors.profileImage = "Profile image is required";

    setErrors(errors);
    if (Object.keys(errors).length > 0) return; // Stop submission if there are errors

    // Form submission
    try {
      const registerForm = new FormData();
      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      setLoading(true); // Set loading to true before making the request

      const response = await axios.post(
        "http://localhost:3000/signup",
        registerForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Clear form data and errors after successful submission
        setFormData({
          userName: "",
          email: "",
          mobile: "",
          password: "",
          profileImage: null,
        });
        setErrors({});
        navigate("/login");
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.messageb);
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after request completes
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
            Signup
          </h1>

          <form
            className="flex flex-col w-full lg:w-10/12 mt-10 text-gray-400"
            onSubmit={handleSubmit}
          >
            <label htmlFor="userName" className="tracking-wide">
              Username*
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="border mb-2 py-2 text-black"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName}</p>
            )}

            <label htmlFor="email" className="tracking-wide">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border mb-2 py-2 text-black"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <label htmlFor="mobile" className="tracking-wide ">
              Mobile*
            </label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              className="border mb-2 py-2 text-black"
              onChange={handleChange}
              value={formData.mobile}
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}

            <label htmlFor="password" className="tracking-wide">
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border mb-2 py-2 text-black"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            <p className="tracking-wide mt-4">Profile Image*</p>

            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="hidden"
              onChange={handleChange}
            />
            <div className="flex items-center">
              <label
                htmlFor="profileImage"
                className="mt-2 hover:cursor-pointer border w-fit h-fit rounded-full p-4 border-gray-500"
              >
                <HiOutlineUpload size={65} color="#4b5563" />
              </label>

              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="profile-image"
                  className="mt-2 max-w-xs ml-4"
                />
              )}
            </div>
            {errors.profileImage && (
              <p className="text-red-500">{errors.profileImage}</p>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-fuchsia-500 hover:bg-fuchsia-700 py-2 w-full rounded-md tracking-wide text-white font-bold text-lg"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center mt-4">
            <p className="text-gray-400 tracking-wide">
              Already a user?{" "}
              <Link to="/login" className="text-gray-600 font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col h-full w-1/2 lg:w-1/3 items-center justify-center">
          <img
            src="/assets/signup-bg.jpg"
            alt="signup-bg"
            className="h-full relative"
          />
          <h1 className="text-black absolute">Hey welcome back</h1>
        </div>
      </div>
    </>
  );  
};

export default Signup;
