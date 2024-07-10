import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9999/users');
      const users = await response.json();

      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        // Lưu thông tin người dùng vào localStorage hoặc context nếu cần
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');
        // Chuyển hướng đến trang chính hoặc trang mong muốn
        window.location.href = '/'; // Chuyển hướng bằng cách thay đổi URL
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
