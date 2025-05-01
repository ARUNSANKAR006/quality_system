import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind must be included here
import ImageUpload from './ImageUpload';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImageUpload />
  </React.StrictMode>,
);
