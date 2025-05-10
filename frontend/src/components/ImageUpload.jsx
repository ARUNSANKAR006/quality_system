import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);
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
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/"); // Go back to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative py-10 px-4">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 Fabric Defect Detector</h1>

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 border p-2 rounded bg-white shadow"
      />

      {/* Preview */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-64 h-64 object-cover mb-4 rounded shadow-lg border"
        />
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
      >
        {loading ? "Analyzing..." : "Predict Defect"}
      </button>

      {/* Loading Text */}
      {loading && (
        <div className="mt-4 text-gray-700 animate-pulse">
          ⏳ Checking fabric...
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-6 bg-white p-4 rounded shadow-lg text-center max-w-md w-full">
          <h2 className="text-xl font-semibold pt-4">
            Result 🔍:{" "}
            <span
              className={`font-bold ${
                prediction.prediction === "defective"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {prediction.prediction.toUpperCase()}
            </span>
          </h2>
          <p className="text-gray-700 pt-4">
            Confidence 📈: {prediction.confidence}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
