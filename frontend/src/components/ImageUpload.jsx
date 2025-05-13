import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, LogOut, Upload, BarChart2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 flex flex-col items-center relative py-10 px-4">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Header Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-lg">
            <AlertTriangle className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-extrabold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Fabric Defect Detector
          </h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-white hover:bg-red-50 text-red-600 hover:text-red-700 px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center gap-2 border border-red-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left Column - Upload Section */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Upload Fabric Image</h2>
          
          <div className="flex flex-col items-center">
            <label className="flex flex-col items-center px-6 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 text-purple-600 rounded-xl shadow tracking-wide uppercase border-2 border-dashed border-purple-300 cursor-pointer hover:bg-indigo-100 hover:border-indigo-400 transition duration-300 w-full">
              <Upload size={40} strokeWidth={1.5} />
              <span className="mt-4 text-lg font-medium">Drag & Drop or Click to Upload</span>
              <span className="mt-2 text-sm text-gray-500">Supported formats: JPG, PNG, WEBP</span>
              <input type='file' className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>

            {image && (
              <div className="mt-6 w-full">
                <p className="text-sm text-gray-600 mb-2">Selected image:</p>
                <div className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-xl border shadow-lg transition transform group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-0 group-hover:opacity-30 transition duration-300 rounded-xl"></div>
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!image || loading}
              className={`mt-8 px-8 py-4 rounded-full shadow-lg text-lg transition duration-300 w-full max-w-sm font-medium flex items-center justify-center gap-2
                ${!image || loading 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"}`}
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
              <div className="mt-4 text-indigo-600 animate-pulse flex items-center">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 animate-progress-indeterminate"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results Section */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100 flex flex-col">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Analysis Results</h2>
          
          {prediction ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={prediction.image_path}
                  alt="Result"
                  className="w-64 h-64 object-cover rounded-xl border shadow-lg"
                />
                <div className={`absolute -bottom-4 -right-4 h-16 w-16 rounded-full flex items-center justify-center shadow-lg ${
                  prediction.prediction === "defective" ? "bg-red-600" : "bg-green-600"
                }`}>
                  {prediction.prediction === "defective" ? 
                    <XCircle size={32} className="text-white" /> : 
                    <CheckCircle size={32} className="text-white" />
                  }
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 mb-3">
                  <Volume2 size={16} className="mr-2" />
                  <span className="text-sm">Audio feedback enabled</span>
                </div>
                
                <h3 className="text-3xl font-bold">
                  <span className={`${
                    prediction.prediction === "defective" ? "text-red-600" : "text-green-600"
                  }`}>
                    {prediction.prediction.toUpperCase()}
                  </span>
                </h3>
                
                <div className="mt-4 bg-gray-100 rounded-full h-4 w-full max-w-xs mx-auto">
                  <div 
                    className={`h-full rounded-full ${
                      prediction.prediction === "defective" ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-gray-700">
                  Confidence: <span className="font-bold">{prediction.confidence}%</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="bg-purple-50 rounded-full p-6 mb-4">
                <AlertTriangle size={48} className="text-purple-400" />
              </div>
              <h3 className="text-xl text-gray-600">No Analysis Yet</h3>
              <p className="mt-2 text-gray-500 max-w-xs">
                Upload an image and click "Analyze Fabric" to get defect prediction results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-12 w-full max-w-6xl">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">{history.length}</span>
              </span>
              Previous Analysis Results
            </h3>
            
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              {history.map((item, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${
                  item.prediction === "defective" 
                    ? "from-red-50 to-red-100 border-red-200" 
                    : "from-green-50 to-green-100 border-green-200"
                  } p-4 rounded-xl shadow border transition hover:shadow-md`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.prediction === "defective" ? "bg-red-600 text-white" : "bg-green-600 text-white"
                    }`}>
                      {item.prediction}
                    </span>
                    <span className="text-sm text-gray-600">{item.confidence}%</span>
                  </div>
                  <div className="relative group">
                    <img
                      src={item.image_path}
                      alt="History"
                      className="w-full h-32 object-cover rounded-lg border shadow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full max-w-6xl mt-12 px-4 py-4 text-center text-gray-500 text-sm">
        <p>© 2025 Fabric Defect Detection System - Advanced AI Analytics</p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #5a5a5a 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
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