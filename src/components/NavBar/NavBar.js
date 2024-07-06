// src/components/NavBar/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Smart Home Automation</div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
        <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="navbar-item"><button className="logout-button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
