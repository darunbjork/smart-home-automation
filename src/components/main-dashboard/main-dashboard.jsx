// src/components/main-dashboard/main-dashboard.jsx
import React, { useState, useEffect } from 'react';
import DeviceCard from '../device-card/device-card';
import PropTypes from 'prop-types';
import './main-dashboard.css';

export const MainDashboard = ({ onDeviceClick }) => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://myflix-movie-app-3823c24113de.herokuapp.com/devices', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching devices');
        console.error('Error fetching devices:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (devices.length === 0) {
    return <div>No devices available</div>;
  }

  return (
    <div className="main-dashboard">
      {devices.map(device => (
        <DeviceCard key={device._id} device={device} onStatusChange={(updatedDevice) => {
          setDevices(prevDevices => 
            prevDevices.map(dev => dev._id === updatedDevice._id ? updatedDevice : dev)
          );
        }} />
      ))}
    </div>
  );
};

MainDashboard.propTypes = {
  onDeviceClick: PropTypes.func.isRequired,
};

export default MainDashboard;
