// src/components/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser) {
      setUser({
        ...storedUser,
        Birthday: storedUser.Birthday.split('T')[0]
      });
    }
    
    axios.get(`https://myflix-movie-app-3823c24113de.herokuapp.com/users/${storedUser.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser({
          ...response.data,
          Birthday: response.data.Birthday.split('T')[0]
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user')).Username;
    axios.put(`https://myflix-movie-app-3823c24113de.herokuapp.com/users/${username}`, user, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setMessage('Profile updated successfully');
        localStorage.setItem('user', JSON.stringify(response.data)); // Update local storage
      })
      .catch(error => {
        setError('Error updating profile');
        console.error('Error updating profile:', error);
      });
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user')).Username;
    axios.delete(`https://myflix-movie-app-3823c24113de.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setMessage('Account deleted successfully');
        localStorage.clear();
        window.location.href = '/';
      })
      .catch(error => {
        setError('Error deleting account');
        console.error('Error deleting account:', error);
      });
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSave}>
        <label>
          Username:
          <input type="text" name="Username" value={user.Username} onChange={handleChange} required autoComplete="username" />
        </label>
        <label>
          Password:
          <input type="password" name="Password" value={user.Password} onChange={handleChange} required autoComplete="current-password" />
        </label>
        <label>
          Email:
          <input type="email" name="Email" value={user.Email} onChange={handleChange} required autoComplete="email" />
        </label>
        <label>
          Birthday:
          <input type="date" name="Birthday" value={user.Birthday} onChange={handleChange} required autoComplete="bday" />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
    </div>
  );
};

export default Profile;
