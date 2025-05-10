import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignUp";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login or Signup Page */}
        <Route path="/" element={<LoginSignup />} />

        {/* Image Upload Page (after login) */}
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
