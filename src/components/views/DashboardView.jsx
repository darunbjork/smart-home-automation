// src/components/views/DashboardView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceCard from '../device-card/device-card';
import './DashboardView.css';

const DashboardView = () => {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('All');
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetch('https://myflix-movie-app-3823c24113de.herokuapp.com/devices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDevices(data);
          const types = Array.from(new Set(data.map(device => device.Type)));
          setDeviceTypes(types);
        })
        .catch((error) => {
          setError('Error fetching devices');
          console.error('Error fetching devices:', error);
        });
    }
  }, [navigate]);

  const handleStatusChange = (updatedDevice) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device._id === updatedDevice._id ? updatedDevice : device
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDevices = filter === 'All' ? devices : devices.filter((device) => device.Type === filter);

  if (error) {
    return <div>{error}</div>;
  }

  if (devices.length === 0) {
    return <div>No devices available</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Device Dashboard</h1>
      <label>
        Filter by type:
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          {deviceTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <div className="device-list">
        {filteredDevices.map((device) => (
          <DeviceCard key={device._id} device={device} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
