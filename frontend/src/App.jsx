import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./components/Auth/LoginSignup";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login or Signup Page */}
        <Route path="/" element={<LoginSignUp />} />

        {/* Image Upload Page (after login) */}
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
