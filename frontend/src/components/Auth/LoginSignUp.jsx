import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus, AlertTriangle } from 'lucide-react';

function LoginSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/image-upload');
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Server error. Try again.');
    }
  };

  const handleSignup = async () => {
    setErrorMsg('');
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }
    try {
      const res = await fetch('http://localhost:7000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! You can now login.');
      } else {
        setErrorMsg(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMsg('Server error. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[url('C:\project\quality_system\frontend\src\assets\background.jpg')] bg-cover bg-no-repeat flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6 text-center">
          <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertTriangle className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Fabric Defect Detector</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full mx-auto mt-2"></div>
          <p className="text-gray-400 mt-4">Login or create an account to continue</p>
        </div>
        
        {/* Form */}
        <div className="p-8 pt-4">
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full py-3 pl-10 pr-4 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full py-3 pl-10 pr-4 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
              />
            </div>
            
            <button 
              type="button" 
              onClick={handleLogin} 
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>
            
            <button 
              type="button" 
              onClick={handleSignup} 
              className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg shadow transition duration-300 flex items-center justify-center gap-2 border border-slate-600"
            >
              <UserPlus size={18} />
              <span>Create Account</span>
            </button>
            
            {errorMsg && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mt-4 flex items-start gap-3">
                <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{errorMsg}</p>
              </div>
            )}
          </form>
        </div>
        
        
      </div>
    </div>
  );
}

export default LoginSignUp;