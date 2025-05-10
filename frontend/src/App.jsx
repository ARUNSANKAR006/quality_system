import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/Auth/LoginSignUp'; // Adjust the path as needed
import ImageUpload from './components/ImageUpload'; // Adjust the path as needed


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for login and signup page */}
          <Route path="/" element={<LoginSignUp />} />

          {/* Route for image upload page */}
          <Route path="/image-upload" element={<ImageUpload />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
