import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css'

function LoginSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    // If login is successful, redirect to ImageUpload page
    // For now, let's assume login is always successful
    navigate('/image-upload');
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
        {/* If you want the sign up feature, add a sign-up function here */}
        <h5 className='h5'>Don't have an account ?</h5>
        <button className="signup" type="button">Sign Up</button>
      </form>
    </div>
  );
}

export default LoginSignUp;
