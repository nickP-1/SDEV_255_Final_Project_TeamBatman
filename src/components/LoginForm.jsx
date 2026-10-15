import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../.config';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      if (!data.token) {
        throw new Error('The server did not return a login token.');
      }

      localStorage.setItem('token', data.token);

      if (data.auth != null) {
        localStorage.setItem('auth', data.auth);
      }

      if (data.username) {
        localStorage.setItem('username', data.username);
      }

      if (data.firstName) {
        localStorage.setItem('firstName', data.firstName);
      }

      navigate('/');
    } catch (err) {
      setErrorMessage(err.message || 'Unable to sign in.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="input-group">
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <button type="submit" className="login-button">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
