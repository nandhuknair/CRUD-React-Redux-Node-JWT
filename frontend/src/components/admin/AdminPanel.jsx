import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/admin/user-details" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <p>View, edit, and delete user information.</p>
          </Link>

          <Link to="/admin/reports" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p>Generate and view various reports.</p>
          </Link>

          <Link to="/admin/settings" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Configure system settings and preferences.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
 