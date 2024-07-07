import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
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
    axios.post('https://myflix-movie-app-3823c24113de.herokuapp.com/users', formData)
      .then((response) => {
        console.log('Sign up successful:', response.data);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError('Error during sign up');
        }
        console.error('Error during sign up:', error);
      });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="Username" value={formData.Username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="Password" value={formData.Password} onChange={handleChange} required autoComplete="current-password" />
        </label>
        <label>
          Email:
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </label>
        <label>
          Birthday:
          <input type="date" name="Birthday" value={formData.Birthday} onChange={handleChange} required />
        </label>
        <button type="submit">Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
