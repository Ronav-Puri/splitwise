import React, { useState } from "react";
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', { 
          username: username, 
          password: password,
        });
        if (response.status === 200) {
          onLoginSuccess(username);
        }
      } catch (err) {
        setError('Invalid username or password');
      }
    };

    return (
        <div className="LoginPage">
            <div className="Login">
                <h1>Hey! Welcome to Splitwise</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="name">Username:</label>
                    <input type="text" id="name" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <button type="submit">Login</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
