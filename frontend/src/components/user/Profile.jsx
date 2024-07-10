import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user +"this is the useselector from the profile page")

  return (
    <>
    <Navbar/>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center">
        <img 
          src={`http://localhost:3000${user.imagePath}`} 
          alt="Profile" 
          className="w-32 h-32 rounded-full mb-4"
        />
        <p className="text-lg"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>Mobile:</strong> {user.mobile}</p>
      </div>
    </div>
    </>
  );
};

export default Profile;