// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myflix-movie-app-3823c24113de.herokuapp.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getUser = (username) => api.get(`/users/${username}`);
export const updateUser = (username, userData) => api.put(`/users/${username}`, userData);
export const deleteUser = (username) => api.delete(`/users/${username}`);
export const updateDeviceStatus = (deviceId, status) => api.put(`/devices/${deviceId}/status`, { status });

export default api;
