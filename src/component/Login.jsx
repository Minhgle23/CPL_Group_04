import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../component/common/style/Login.css'; 

const Login = ({ setIsAuthenticated, setUser }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9999/users');
      const users = await response.json();

      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        alert('Login successful');

        if(user?.role === "ADMIN"){
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form" id="form2">
          <h2 className="login-title">Sign In</h2>
          <input
            type="text"
            placeholder="username"
            className="login-input"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="login-link">Forgot your password?</a>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;