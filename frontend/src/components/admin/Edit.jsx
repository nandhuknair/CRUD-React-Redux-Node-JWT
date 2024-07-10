import axios from "axios";
import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { toast } from "sonner";
import LoadingSpinner from "../user/LoadingSpinner";

const Edit = ({ user }) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [formData, setFormData] = useState({
    userName: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    profileImage: user.imagePath || null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleAddUser = () => {
    setShowAddUser(!showAddUser); // Toggle showAddUser state
  };

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

    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
    }

    // Validation
    const errors = {};
    if (!formData.userName) errors.userName = "Username is required*";
    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid*";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required*";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number is invalid*";
    }

    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Form submission
    try {
      const updateForm = new FormData();
      updateForm.append("userName", formData.userName);
      updateForm.append("email", formData.email);
      updateForm.append("mobile", formData.mobile);
      if (formData.profileImage && formData.profileImage instanceof File) {
        updateForm.append("profileImage", formData.profileImage);
      }

      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/admin/edit-user/${user._id}`,
        updateForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          userName: response.data.user.name,
          email: response.data.user.email,
          mobile: response.data.user.mobile,
          profileImage: response.data.user.imagePath,
        });
        setErrors({});
        window.location.href = "/admin/user-details";
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
      <button
        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
        onClick={toggleAddUser}
      >
        Edit
      </button>

      {showAddUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button
                onClick={toggleAddUser}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username*
                </label>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {errors.userName && (
                  <p className="text-red-400">{errors.userName}</p>
                )}
                <label
                  htmlFor="email"
                  className="tracking-wide block text-gray-700 text-sm font-bold mb-2"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border-2 border-gray-300 p-2 w-full"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && <p className="text-red-400">{errors.email}</p>}

                <label
                  htmlFor="mobile"
                  className="tracking-wide block text-gray-700 text-sm font-bold mb-2"
                >
                  Mobile*
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  className="border-2 border-gray-300 p-2 w-full"
                  onChange={handleChange}
                  value={formData.mobile}
                />
                {errors.mobile && (
                  <p className="text-red-400">{errors.mobile}</p>
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
                      src={
                        typeof formData.profileImage === "string"
                          ? `http://localhost:3000${formData.profileImage}`
                          : URL.createObjectURL(formData.profileImage)
                      }
                      alt="profile-image"
                      className="mt-2 max-w-56 ml-4"
                    />
                  )}
                </div>
                {errors.profileImage && (
                  <p className="text-red-400">{errors.profileImage}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleAddUser}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
