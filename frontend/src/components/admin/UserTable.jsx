import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { adminLogin } from "../../Redux/adminSlice";
import LoadingSpinner from "../user/LoadingSpinner";
import SearchUser from "./SearchUser";
import Edit from "./Edit";
import Delete from "./Delete";
import AddUser from "./AddUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  console.log(admin); //This way we can use the use  selector to manage the state globally :)
  useEffect(() => {
    const fetchData = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
      }
      try {
        setLoading(true);
        const user = await axios.get("http://localhost:3000/admin/users");
        dispatch(adminLogin(user.data.adminData));
        setUsers(user.data.userData);
        setFilteredUsers(user.data.userData);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() ||
              user.mobile.toString().includes(searchQuery) ||
              user.email.toString().includes(searchQuery)
          )
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Users</h1>
        <div className="flex justify-between items-center">
          <SearchUser onSearch={handleSearch} />
          <AddUser />
        </div>
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:3000${user.imagePath}`}
                    alt={user.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.mobile}</td>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <Edit user={user} />
                  <Delete userId={user._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
