// src/components/device-card/device-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './device-card.css';

const DeviceCard = ({ device, onStatusChange }) => {
  const handleStatusChange = (newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    axios.put(`https://myflix-movie-app-3823c24113de.herokuapp.com/devices/${device._id}/status`, 
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      onStatusChange(response.data);
    })
    .catch((error) => {
      console.error('Error updating device status:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    });
  };

  const handleBrightnessChange = (newBrightness) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    axios.put(`https://myflix-movie-app-3823c24113de.herokuapp.com/devices/${device._id}/brightness`, 
      { brightness: newBrightness },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      onStatusChange(response.data);
    })
    .catch((error) => {
      console.error('Error updating device brightness:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    });
  };

  return (
    <div className="device-card">
      <h2>{device.Name}</h2>
      <p>{device.Description}</p>
      <img src={device.ImagePath} alt={device.Name} className="device-image" />
      <div className="device-icon">
        {device.Type === 'Light' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'yellow' : 'gray' }}>brightness_high</i>}
        {device.Type === 'Temperature Control' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'red' : 'gray' }}>thermostat</i>}
        {device.Type === 'Smart Plug' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'green' : 'gray' }}>power</i>}
        {device.Type === 'Security Camera' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'blue' : 'gray' }}>videocam</i>}
        {device.Type === 'Smart Lock' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'orange' : 'gray' }}>lock</i>}
        {device.Type === 'Smart Speaker' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'purple' : 'gray' }}>speaker</i>}
        {device.Type === 'Smart Fridge' && <i className="material-icons" style={{ fontSize: '48px', color: device.Status === 'On' ? 'cyan' : 'gray' }}>kitchen</i>}
      </div>
      <p>Status: {device.Status}</p>
      {device.Type === 'Light' && (
        <div>
          <label htmlFor="brightness">Brightness: {device.Brightness || 50}</label>
          <input
            type="range"
            id="brightness"
            name="brightness"
            min="0"
            max="100"
            value={device.Brightness || 50}
            onChange={(e) => handleBrightnessChange(e.target.value)}
            disabled={device.Status === 'Off'}
          />
        </div>
      )}
      <button onClick={() => handleStatusChange(device.Status === 'On' ? 'Off' : 'On')}>
        Turn {device.Status === 'On' ? 'Off' : 'On'}
      </button>
    </div>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default DeviceCard;
