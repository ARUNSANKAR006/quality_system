import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Volume2, LogOut, Upload, BarChart2, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

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
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center relative py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 z-10">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-teal-400 flex items-center justify-center shadow-lg">
            <AlertTriangle className="text-white" size={28} />
          </div>
          <div className="ml-4">
            <h1 className="text-4xl font-extrabold text-white">
              Fabric Defect Detector
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full mt-1"></div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg shadow-lg transition duration-300 flex items-center gap-2 border border-slate-700"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl z-10">
        {/* Upload Section */}
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Fabric Image</h2>
          <div className="flex flex-col items-center">
            <label className="flex flex-col items-center px-6 py-10 bg-slate-900 text-white rounded-lg shadow-md tracking-wide border-2 border-dashed border-slate-600 cursor-pointer hover:bg-slate-800 hover:border-teal-400 transition duration-300 w-full">
              <Upload size={40} strokeWidth={1.5} className="text-teal-400" />
              <span className="mt-4 text-lg font-medium">Drag & Drop or Click to Upload</span>
              <span className="mt-2 text-sm text-gray-400">Supported formats: JPG, PNG, WEBP</span>
              <input type='file' className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>

            {image && (
              <div className="mt-6 w-full">
                <p className="text-sm text-gray-400 mb-2">Selected image:</p>
                <div className="relative group flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="max-w-full max-h-64 object-contain rounded-lg border border-slate-600 shadow-lg transition transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent opacity-0 group-hover:opacity-50 transition duration-300 rounded-lg"></div>
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!image || loading}
              className={`mt-8 px-8 py-4 rounded-lg shadow-lg text-lg transition duration-300 w-full max-w-sm font-medium flex items-center justify-center gap-2
                ${!image || loading
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white"}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <BarChart2 size={20} />
                  <span>Analyze Fabric</span>
                </>
              )}
            </button>

            {loading && (
              <div className="mt-4 text-white animate-pulse flex items-center w-full">
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 animate-progress-indeterminate"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>

          {prediction ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative">
                <div className={`absolute -top-12 -right-4 h-16 w-16 rounded-full flex items-center justify-center shadow-xl ${
                  prediction.prediction === "defective" ? "bg-red-500" : "bg-emerald-500"
                }`}>
                  {prediction.prediction === "defective"
                    ? <XCircle size={32} className="text-white" />
                    : <CheckCircle size={32} className="text-white" />}
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 text-white mb-3 mt-2">
                  <Volume2 size={16} className="mr-2" />
                  <span className="text-sm">Audio feedback enabled</span>
                </div>

                <h3 className="text-3xl font-bold">
                  <span className={`${
                    prediction.prediction === "defective" ? "text-red-400" : "text-emerald-400"
                  }`}>
                    {prediction.prediction.toUpperCase()}
                  </span>
                </h3>

                <div className="mt-4 bg-slate-700 rounded-full h-4 w-full max-w-xs mx-auto">
                  <div
                    className={`h-full rounded-full ${
                      prediction.prediction === "defective"
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600"
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-white">
                  Confidence: <span className="font-bold">{prediction.confidence}%</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <div className="bg-slate-700 rounded-full p-6 mb-4">
                <AlertTriangle size={48} className="text-amber-400" />
              </div>
              <h3 className="text-xl text-white">No Analysis Yet</h3>
              <p className="mt-2 text-gray-400 max-w-xs">
                Upload an image and click "Analyze Fabric" to get defect prediction results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-12 w-full max-w-6xl z-10">
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="bg-slate-700 text-white h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">{history.length}</span>
                </span>
                Previous Analysis Results
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              {history.map((item, idx) => (
                <div key={idx} className={`bg-slate-900 p-4 rounded-lg shadow-md border ${
                  item.prediction === "defective"
                    ? "border-red-500/30"
                    : "border-emerald-500/30"
                } transition hover:shadow-lg group`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.prediction === "defective" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
                    }`}>
                      {item.prediction}
                    </span>
                    <span className="text-sm text-gray-400">{item.confidence}%</span>
                  </div>
                  <div className="relative group">
                    <img
                      src={item.image_path}
                      alt="History"
                      className="w-full h-28 object-contain rounded-md border border-slate-700 shadow-md transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition duration-300 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full max-w-6xl mt-12 px-4 py-4 text-center text-slate-500 text-sm z-10">
        <p>© 2025 Fabric Defect Detection System - Advanced AI Analytics</p>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s infinite linear;
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;