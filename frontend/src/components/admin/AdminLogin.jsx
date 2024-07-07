import React from 'react'

const AdminLogin = () => {
  return (    
    <div className='flex h-screen'>
      <div className="flex flex-col justify-center px-24 h-full w-full md:w-1/2 lg:w-2/3 lg:ml-36">
          <h1 className='text-gray-600 font-bold text-3xl tracking-wider'>LOGIN ADMIN</h1>
 
        <div className="flex flex-col w-full lg:w-10/12 mt-20">
          <label htmlFor="email" className="text-gray-400 tracking-wide">Email*</label>
          <input type="email" className="border mt-4 mb-10 py-4"/>

          <label htmlFor="password" className="text-gray-400 tracking-wide">Password*</label>
          <input type="password" className="border mt-4 py-4"/>

          <div className="flex mt-4">
            <input type="checkbox" />
            <p className="px-2 tracking-wide text-gray-400">Remember Me</p>
          </div>

          <div className="flex justify-center mt-10">
            <button className='bg-fuchsia-500 hover:bg-fuchsia-700 py-5 w-full rounded-md tracking-wide text-white font-bold text-lg'>Sign In</button>
          </div>
        </div>

      </div>
 
      <div className="hidden md:flex flex-col h-full w-1/2 lg:w-1/3 items-center justify-center">
        <img src="/assets/pexels-soloman-soh-674993-1557183.jpg" alt="admin-login-bg" className='h-full relative'/>
        <h1 className='text-black absolute'>Hey welcome back</h1>
      </div>
    </div>
  );
}

export default AdminLogin
