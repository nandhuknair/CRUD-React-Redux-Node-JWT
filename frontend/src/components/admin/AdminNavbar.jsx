import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../Redux/adminSlice';
import { toast } from 'sonner';

const AdminNavbar = () => {
const dispatch = useDispatch()
const admin = useSelector((state)=> state.admin)
console.log(admin)
  const handleLogout = () => {
    dispatch(adminLogout());
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully!");
    window.location.href = '/admin'
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin/dashboard" className="text-xl font-bold">Admin Dashboard</Link>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
