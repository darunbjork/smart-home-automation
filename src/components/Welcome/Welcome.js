import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Smart Home Automation</h1>
      <div className="button-container">
        <Link to="/signup">
          <button className="welcome-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="welcome-button">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
