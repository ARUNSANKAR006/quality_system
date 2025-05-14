import React from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { prediction, confidence, heatmapPath, imagePath } = state || {};
  
  if (!prediction) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 text-center max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-red-400 mb-6">No prediction found</h1>
          <button 
            onClick={() => navigate('/')} 
            className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-6xl mb-10">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-3xl font-extrabold text-white text-center">
            Prediction Result
          </h1>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full mx-auto"></div>
      </div>
      
      {/* Image Comparison */}
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-center">
            <p className="font-medium mb-3 text-gray-300">Uploaded Image:</p>
            <div className="relative group">
              <img 
                src={imagePath} 
                alt="Uploaded" 
                className="w-64 h-64 object-cover rounded-lg border border-slate-600 shadow-lg transition transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-50 transition duration-300 rounded-lg"></div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-center">
            <p className="font-medium mb-3 text-gray-300">Detected Defect Region (Grad-CAM):</p>
            <div className="relative group">
              <img 
                src={heatmapPath} 
                alt="Grad-CAM" 
                className="w-64 h-64 object-cover rounded-lg border border-slate-600 shadow-lg transition transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent opacity-0 group-hover:opacity-50 transition duration-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Result Box */}
      <div className="mt-10 w-full max-w-md">
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            prediction === "defective" ? "bg-red-500/20" : "bg-emerald-500/20"
          }`}>
            <span className={`text-2xl ${
              prediction === "defective" ? "text-red-400" : "text-emerald-400"
            }`}>
              🔍
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">
            Result: {" "}
            <span className={`font-bold ${
              prediction === "defective" ? "text-red-400" : "text-emerald-400"
            }`}>
              {prediction.toUpperCase()}
            </span>
          </h2>
          
          <div className="mt-2 bg-slate-700 rounded-full h-4 w-full max-w-xs mx-auto">
            <div
              className={`h-full rounded-full ${
                prediction === "defective"
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600"
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-300">
            Confidence: <span className="font-bold">{confidence}%</span>
          </p>
          
          <button 
            onClick={() => navigate('/')} 
            className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg shadow transition duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            <span>Return to Analysis</span>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full max-w-6xl mt-12 px-4 py-4 text-center text-slate-500 text-sm">
        <p>© 2025 Fabric Defect Detection System - Advanced AI Analytics</p>
      </div>
    </div>
  );
};

export default ResultPage;