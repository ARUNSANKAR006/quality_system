import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2 } from 'lucide-react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (prediction) {
      const utterance = new SpeechSynthesisUtterance(
        `The fabric is ${prediction.prediction} with ${prediction.confidence} percent confidence`
      );
      speechSynthesis.speak(utterance);
      setHistory((prev) => [prediction, ...prev.slice(0, 4)]);
    }
  }, [prediction]);

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
        body: formData,
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
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-purple-100 to-pink-100 flex flex-col items-center relative py-10 px-4">
      <div className="absolute top-4 right-4" >
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow" 
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-700 drop-shadow">
        🧠 Fabric Defect Detector
      </h1>

      <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M16.88 9.94A6.5 6.5 0 1 0 9.94 16.88l-3.9 3.9a1 1 0 1 0 1.41 1.42l3.9-3.9a6.5 6.5 0 0 0 5.53-8.36z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Upload Image</span>
        <input type='file' className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-64 h-64 object-cover mt-4 rounded-xl border shadow-lg"
        />
      )}

      <button
        onClick={handleUpload}
        className="mt-6 bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-full shadow-lg text-lg transition duration-300"
      >
        {loading ? "Analyzing..." : "Predict Defect"}
      </button>

      {loading && (
        <div className="mt-4 text-gray-700 animate-pulse">
          ⏳ Checking fabric...
        </div>
      )}

      {prediction && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full border-t-4 border-purple-400">
          <h2 className="text-2xl font-bold">
            Result 🔍:
            <span
              className={`ml-2 font-extrabold ${
                prediction.prediction === "defective"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {prediction.prediction.toUpperCase()}
            </span>
          </h2>
          <p className="mt-2 text-gray-700 text-lg">
            Confidence 📈: {prediction.confidence}%
          </p>
          <img
            src={prediction.image_path}
            alt="Result"
            className="mt-4 w-52 h-52 object-cover rounded border shadow"
          />
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">🧾 Prediction History (last 5)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {history.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow border">
                <p>
                  <strong>Prediction:</strong>{" "}
                  <span
                    className={`$ {
                      item.prediction === "defective"
                        ? "text-red-500"
                        : "text-green-500"
                    } font-semibold`}
                  >
                    {item.prediction}
                  </span>
                </p>
                <p className="text-sm">Confidence: {item.confidence}%</p>
                <img
                  src={item.image_path}
                  alt="History"
                  className="w-24 h-24 object-cover mt-2 rounded border"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
