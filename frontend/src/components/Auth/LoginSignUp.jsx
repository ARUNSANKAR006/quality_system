import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation for now
    if (email && password) {
      navigate("/upload"); // Redirect to image upload page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2725/2725427.png"
            alt="logo"
            className="h-12"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Medical Image Captioning System" : "Create an Account"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isLogin
              ? "Sign in to access your medical dashboard"
              : "Sign up to get started"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        {/* Or */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-400">Or continue with</span>
        </div>

        {/* Social Login UI */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
            Google
          </button>
          <button className="flex-1 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
            Facebook
          </button>
        </div>

        {/* Toggle login/signup */}
        <p className="text-sm text-center text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
