import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Prediction failed. Check server logs.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Defect Detection</h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        accept="image/*"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
        disabled={!selectedFile || loading}
      >
        {loading ? 'Uploading...' : 'Upload & Detect'}
      </button>

      {result && (
        <div className="mt-6 text-center">
          {result.error ? (
            <p className="text-red-600 text-lg font-semibold">
              ❌ Error: {result.error}
            </p>
          ) : (
            <div>
              <p className="text-xl">
                <strong>Result:</strong>{' '}
                <span className={result.prediction === 'defective' ? 'text-red-600' : 'text-green-600'}>
                  {result.prediction.toUpperCase()}
                </span>
              </p>
              <p className="text-gray-700">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
