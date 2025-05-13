import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/loader.json';
import './Loader.css';


const Loader = () => {
  return (
    <div className="loader-overlay">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default Loader;
