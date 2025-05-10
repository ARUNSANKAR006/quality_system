import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignUp";
//import Dashboard from "./components/Dashboard"; // create this later

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
