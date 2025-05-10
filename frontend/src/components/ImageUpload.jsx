import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud } from 'lucide-react'; // For icon

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setPrediction(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <div className="w-full px-6 py-4 flex justify-between items-center shadow bg-white">
        <h1 className="text-xl font-bold text-blue-700">Fabric Defect Detector</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Inspector</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Card Centered */}
      <div className="flex flex-1 justify-center items-center px-4 py-10">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl text-center">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-indigo-600 text-4xl mb-2">🧵</div>
            <h2 className="text-2xl font-bold">Textile Defect Inspection</h2>
            <p className="text-gray-500 mt-1 text-sm">
              Upload a fabric image to check for defects using AI.
            </p>
          </div>

          {/* Upload Section */}
          <label
            htmlFor="fileInput"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors flex flex-col items-center mb-4"
          >
            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">
              Drag & drop your fabric image here, or click to upload
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-64 h-64 object-cover mx-auto mb-4 rounded-lg border shadow"
            />
          )}

          {/* Analyze Button */}
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Analyzing..." : "Detect Defect"}
          </button>

          {/* Loading Animation */}
          {loading && (
            <p className="mt-4 text-sm text-gray-500 animate-pulse">🔍 Scanning fabric for defects...</p>
          )}

          {/* Result Box */}
          {prediction && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border text-center">
              <h3 className="text-lg font-semibold">
                Result 🧵:{' '}
                <span
                  className={`font-bold ${
                    prediction?.prediction?.toLowerCase() === "defective"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {prediction?.prediction?.toUpperCase?.() || "Unknown"}
                </span>
              </h3>
              <p className="mt-2 text-gray-700">
                Confidence 📈: {prediction?.confidence ? `${prediction.confidence}%` : "N/A"}
              </p>

              {/* Grad-CAM Heatmap Display */}
              {prediction?.heatmap_path && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    📍 Defect Localization (Grad-CAM)
                  </h4>
                  <img
                    src={`http://localhost:5000${prediction.heatmap_path}`}
                    alt="Grad-CAM Heatmap"
                    className="w-64 h-64 mx-auto rounded-lg border shadow"
                  />
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-sm text-red-600 font-medium">
              ❌ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
