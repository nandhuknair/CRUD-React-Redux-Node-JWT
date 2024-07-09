import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/userSlice'; 

const Navbar = ({ userName }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = '/login'; 
  };

  return (
    <div>
      <h1>Hello</h1>
      <h1>{userName}</h1>
      <button className='bg-red-200 p-6 px-10 m-5' onClick={handleLogout}>Logout</button>
    </div>
  );  
};

export default Navbar;
