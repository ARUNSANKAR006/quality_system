import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignUp";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
