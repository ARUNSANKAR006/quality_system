import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

function LoginSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
    <div className="login-signup-container">
      <h1>Login or SignUp</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="button" onClick={handleLogin}>Login</button>
        <h5 className='h5'>Don't have an account ?</h5>
        <button className="signup" type="button" onClick={handleSignup}>Sign Up</button>
        {errorMsg && <p className="error-msg">❌ {errorMsg}</p>}
      </form>
    </div>
  );
}

export default LoginSignUp;
