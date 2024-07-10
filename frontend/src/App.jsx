import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/user/Home';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import { Toaster } from 'sonner';
import UserPrivateRoute from './components/user/UserPrivateRoute';
import Error from './components/user/Error';
import UserTable from './components/admin/UserTable';
import Profile from './components/user/Profile';

function App() {
  const user = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const isAdmin = localStorage.getItem("isAdmin")
  const adminToken = localStorage.getItem("adminToken")

  console.log(token)

  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<UserPrivateRoute element={<Home />} />} />
          <Route path="/profile" element={<UserPrivateRoute element={<Profile />} />} />
          <Route path="/login" element={!user && !token ? <Login /> : <Navigate to ="/" />} />
          <Route path="/signup" element={!user && !token ? <Signup /> : <Navigate to = "/" />} />
          <Route path="/admin/dashboard" element={isAdmin && adminToken ? <AdminPanel />:<Navigate to ="/admin" />} />
          <Route path="/admin" element={!isAdmin && !adminToken ?<AdminLogin />: <Navigate to ="/admin/dashboard" />} />
          <Route path="/admin/user-details" element={isAdmin && adminToken ?<UserTable />: <Navigate to ="/admin" />} />

          </Routes>
      </Router>
    </div>    
  );
}  

export default App
