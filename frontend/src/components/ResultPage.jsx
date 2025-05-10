import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { prediction, confidence, heatmapPath, imagePath } = state || {};

  if (!prediction) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-bold text-red-600">No prediction found</h1>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Prediction Result 🧵</h1>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="text-center">
          <p className="font-semibold mb-2">Uploaded Image:</p>
          <img src={imagePath} alt="Uploaded" className="w-64 h-64 object-cover border rounded shadow" />
        </div>
        <div className="text-center">
          <p className="font-semibold mb-2">Detected Defect Region (Grad-CAM):</p>
          <img src={heatmapPath} alt="Grad-CAM" className="w-64 h-64 object-cover border rounded shadow" />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow-lg text-center max-w-md w-full">
        <h2 className="text-xl font-semibold pt-2">
          Result 🔍:{" "}
          <span
            className={`font-bold ${prediction === "defective" ? "text-red-600" : "text-green-600"}`}
          >
            {prediction.toUpperCase()}
          </span>
        </h2>
        <p className="text-gray-700 pt-2">
          Confidence 📈: {confidence}%
        </p>
      </div>
    </div>
  );
};

export default ResultPage;
