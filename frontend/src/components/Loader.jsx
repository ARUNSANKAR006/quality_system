// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 animate-pulse">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
      <p className="mt-2 text-blue-600 font-semibold">Analyzing Image...</p>
    </div>
  );
};

export default Loader;
