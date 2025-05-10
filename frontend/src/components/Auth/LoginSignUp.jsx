import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    // Simulated login/signup logic
    if (userID && password) {
      localStorage.setItem("user", userID);
      navigate("/Dashboard"); // go to next page
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <input
          type="text"
          placeholder="User ID"
          className="w-full mb-4 p-2 border rounded"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
        <input
          style={{margin:10}}
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleAuth}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-700 cursor-pointer font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
