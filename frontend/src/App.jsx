import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/user/Home';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPrivateRoute';
import { Toaster } from 'sonner';
import UserPrivateRoute from './components/user/UserPrivateRoute';
import AdminPrivateRoute from './components/admin/adminPrivateRouter';
import Error from './components/user/Error';

function App() {
  const user = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const isAdmin = localStorage.getItem("isAdmin")

  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<UserPrivateRoute element={<Home />} />} />
          <Route path="/login" element={!user && !token ? <Login /> : <Navigate to ="/" />} />
          <Route path="/signup" element={!user && !token ? <Signup /> : <Navigate to = "/" />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminPrivateRoute element={<AdminPanel />} />} />
          </Routes>
      </Router>
    </div>
  );
}  

export default App
