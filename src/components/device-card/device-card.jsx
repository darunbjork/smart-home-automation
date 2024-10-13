import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLightbulb, 
  faThermometerHalf, 
  faPlug, 
  faVideo, 
  faLock, 
  faVolumeUp, 
  faBlender, 
  faTrash, 
  faBell, 
  faFan, 
  faTachometerAlt, 
  faDoorOpen, 
  faCloudSun, 
  faCoffee, 
  faPaw, 
  faTv, 
  faSprayCan
} from '@fortawesome/free-solid-svg-icons';
import './device-card.css';

const DeviceCard = ({ device, onStatusChange }) => {
  const [brightness, setBrightness] = useState(device.Brightness || 50);

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
      setBrightness(newBrightness);
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

  const getIcon = (type) => {
    switch (type) {
      case 'Light':
      case 'Smart Light Strip':
        return faLightbulb;
      case 'Thermostat':
        return faThermometerHalf;
      case 'Smart Plug':
        return faPlug;
      case 'Security Camera':
        return faVideo;
      case 'Smart Lock':
        return faLock;
      case 'Smart Speaker':
        return faVolumeUp;
      case 'Smart Refrigerator':
      case 'Refrigerator':
        return faBlender;
      case 'Smart Oven':
      case 'Oven':
        return faBlender;
      case 'Smart Washer':
      case 'Washing Machine':
        return faTrash;
      case 'Smart Dryer':
      case 'Dryer':
        return faTachometerAlt;
      case 'Smart Vacuum Cleaner':
      case 'Vacuum Cleaner':
        return faTrash;
      case 'Smart Doorbell':
      case 'Doorbell':
        return faBell;
      case 'Smart Smoke Detector':
      case 'Smoke Detector':
        return faCloudSun;
      case 'Smart Fan':
      case 'Fan':
        return faFan;
      case 'Smart TV':
      case 'TV':
        return faTv;
      case 'Smart Coffee Maker':
      case 'Coffee Maker':
        return faCoffee;
      case 'Smart Pet Feeder':
      case 'Pet Feeder':
        return faPaw;
      case 'Smart Sprinkler System':
      case 'Sprinkler System':
        return faSprayCan;
      default:
        return faDoorOpen;
    }
  };

  const renderControls = () => {
    switch (device.Type) {
      case 'Light':
      case 'Smart Light Strip':
        return (
          <div>
            <label htmlFor="brightness">Brightness: {brightness}</label>
            <input
              type="range"
              id="brightness"
              name="brightness"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightnessChange(e.target.value)}
              disabled={device.Status === 'Off'}
            />
          </div>
        );
      case 'Smart Fan':
        return (
          <div>
            <label htmlFor="speed">Speed: {device.Speed || 1}</label>
            <input
              type="range"
              id="speed"
              name="speed"
              min="1"
              max="5"
              value={device.Speed || 1}
              onChange={(e) => console.log(`Set fan speed to ${e.target.value}`)}
              disabled={device.Status === 'Off'}
            />
          </div>
        );
      case 'Thermostat':
        return (
          <div>
            <label htmlFor="temperature">Temperature: {device.Temperature || 22}°C</label>
            <input
              type="range"
              id="temperature"
              name="temperature"
              min="16"
              max="30"
              value={device.Temperature || 22}
              onChange={(e) => console.log(`Set temperature to ${e.target.value}`)}
              disabled={device.Status === 'Off'}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="device-card">
      <h2>{device.Name}</h2>
      <p>{device.Description}</p>
      <img src={device.ImagePath} alt={device.Name} className="device-image" />
      <div className="device-icon">
        <FontAwesomeIcon icon={getIcon(device.Type)} style={{ color: device.Status === 'On' ? 'yellow' : 'gray' }} />
      </div>
      <p>Status: {device.Status}</p>
      {renderControls()}
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
