import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = () => api.get('/health');

export const registerStudent = (studentData) => {
  return api.post('/register', studentData);
};

export const markAttendance = (imageData) => {
  return api.post('/attendance', { image: imageData });
};

export const getReports = () => api.get('/reports');

export const getStudents = () => api.get('/students');

export default api;