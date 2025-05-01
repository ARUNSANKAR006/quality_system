import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Defect Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {prediction && (
        <div>
          <h2>Prediction: {prediction.prediction}</h2>
          <p>Confidence: {prediction.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
    