import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('https://myflix-movie-app-3823c24113de.herokuapp.com/login', formData)
      .then((response) => {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin();
        navigate('/profile');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError('Error during login');
        }
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="Username" value={formData.Username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="Password" value={formData.Password} onChange={handleChange} required autoComplete="new-password" />
        </label>
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
