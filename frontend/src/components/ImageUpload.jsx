import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🧠 Fabric Defect Detector</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-64 h-64 object-cover mb-4 rounded shadow"
        />
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
      >
        {loading ? "Analyzing..." : "Predict Defect"}
      </button>

      {loading && (
        <div className="mt-4 text-gray-700 animate-pulse">
          ⏳ Checking fabric...
        </div>
      )}

      {prediction && (
        <div className="mt-6 bg-white p-4 rounded shadow-lg text-center">
          <h2 className="text-xl font-semibold" style={{paddingTop:20}}>
            Result 🔍:{" "}
            <span className={`font-bold ${prediction.prediction === "defective" ? "text-red-600" : "text-green-600"}`}>
              {prediction.prediction.toUpperCase()}
            </span>
          </h2>
          <p className="text-gray-700" style={{paddingTop:20}}>Confidence 📈: {prediction.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
