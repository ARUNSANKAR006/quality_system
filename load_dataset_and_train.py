"""  import React, { useState } from 'react';
 import { motion } from 'framer-motion';
 import { UploadCloud, LoaderCircle } from 'lucide-react';

 export default function ImageUpload() {
   const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
   const [result, setResult] = useState(null);
   const [loading, setLoading] = useState(false);

#   const handleFileChange = (e) => {
#     const selected = e.target.files[0];
#     setFile(selected);
#     setPreview(URL.createObjectURL(selected));
#     setResult(null);
#   };

#   const handleUpload = async () => {
#     if (!file) return;
#     setLoading(true);
#     const formData = new FormData();
#     formData.append('file', file);

#     try {
#       const res = await fetch('http://localhost:5000/predict', {
#         method: 'POST',
#         body: formData,
#       });
#       const data = await res.json();
#       setResult(data);
#     } catch (err) {
#       alert('Prediction failed. Please check backend!');
#     } finally {
#       setLoading(false);
#     }
#   };

#   return (
#     <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex items-center justify-center px-4 font-sans">
#       <motion.div
#         className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-md w-full border border-white/20"
#         initial={{ opacity: 0, y: 30 }}
#         animate={{ opacity: 1, y: 0 }}
#         transition={{ duration: 0.5 }}
#       >
#         <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
#           AI Defect Detector
#         </h1>

#         <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-white/30 py-6 rounded-2xl mb-4 bg-white/5 hover:bg-white/10 transition">
#           <UploadCloud className="w-10 h-10 text-white mb-2" />
#           <span className="text-white font-medium">Click or Drop an image</span>
#           <input type="file" className="hidden" onChange={handleFileChange} />
#         </label>

#         {preview && (
#           <motion.img
#             key={preview}
#             src={preview}
#             alt="Preview"
#             className="w-full h-52 object-contain mb-4 rounded-xl border border-white/30 bg-white/10"
#             initial={{ scale: 0.8, opacity: 0 }}
#             animate={{ scale: 1, opacity: 1 }}
#             transition={{ duration: 0.4 }}
#           />
#         )}

#         <button
#           onClick={handleUpload}
#           className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-blue-500 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg transition duration-300 flex items-center justify-center"
#         >
#           {loading && <LoaderCircle className="animate-spin mr-2" />}
#           {loading ? 'Analyzing...' : 'Predict Defect'}
#         </button>

#         {result && (
#           <motion.div
#             className={`mt-6 text-center p-4 rounded-xl ${
#               result.prediction === 'defective'
#                 ? 'bg-red-500/20 text-red-200 border border-red-300/30'
#                 : 'bg-green-500/20 text-green-200 border border-green-300/30'
#             }`}
#             initial={{ opacity: 0, y: 20 }}
#             animate={{ opacity: 1, y: 0 }}
#             transition={{ duration: 0.4 }}
#           >
#             <p className="text-2xl font-bold tracking-wide">
#               {result.prediction.toUpperCase()}
#             </p>
#             <p className="text-sm opacity-80">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
#           </motion.div>
#         )}
#       </motion.div>
#     </div>
#   );
# }
 """