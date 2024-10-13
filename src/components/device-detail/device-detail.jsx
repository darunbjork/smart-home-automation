//device-detail.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './device-detail.css';

const DeviceDetail = ({ device, onBackClick }) => {
  return (
    <div className="device-detail">
      <h2>{device.Name}</h2>
      <p>{device.Description}</p>
      <p>Status: {device.Status}</p>
      <p>Type: {device.Type}</p>
      <p>Location: {device.Location}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

DeviceDetail.propTypes = {
  device: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Status: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DeviceDetail;
