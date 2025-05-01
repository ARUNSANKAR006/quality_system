import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, LoaderCircle } from 'lucide-react';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Prediction failed. Please check backend!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Defect Detection</h1>

        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 py-6 rounded-xl mb-4 hover:bg-gray-50">
          <UploadCloud className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Click to select an image</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {preview && (
          <motion.img
            key={preview}
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain mb-4 rounded-lg border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-xl font-semibold transition duration-300 flex items-center justify-center"
        >
          {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {result && (
          <motion.div
            className={`mt-6 text-center p-4 rounded-xl ${
              result.prediction === 'defective' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xl font-semibold">{result.prediction.toUpperCase()}</p>
            <p className="text-sm">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
