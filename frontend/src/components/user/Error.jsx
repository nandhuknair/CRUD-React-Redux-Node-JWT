import React, { useEffect } from 'react'

const Error = () => {

    // useEffect(()=> {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("userId")
    // },[])

  return (
    <div>
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default Error
