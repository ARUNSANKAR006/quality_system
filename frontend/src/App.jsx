// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/Auth/LoginSignUp';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
