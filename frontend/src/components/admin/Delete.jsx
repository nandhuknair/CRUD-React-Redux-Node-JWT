import axios from "axios";
import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Delete = ({ userId }) => {
  const deleteUser = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/delete-user/${userId}`
      );
      console.log(response);
      window.location.href = "/admin/user-details";
    } catch (error) {
      console.log(error);
      toast.error("Error occur while deleting the user");
    }
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser();
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
