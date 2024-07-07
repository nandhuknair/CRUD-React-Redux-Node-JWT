import React from 'react';
import { HashLoader } from 'react-spinners';

function LoadingSpinner() {
  console.log('Loading spinner is called')
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <HashLoader color="#36d7b7" size={80} />
    </div>
  );
}

export default LoadingSpinner;