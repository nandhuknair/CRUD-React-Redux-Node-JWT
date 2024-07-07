import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/user/Home';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import { Toaster } from 'sonner';
import LoadingSpinner from './components/user/LoadingSpinner';

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sp" element={<LoadingSpinner/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminPanel/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
