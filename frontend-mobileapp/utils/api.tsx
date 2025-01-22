import axios from 'axios';
import { Platform } from 'react-native';

//const apiUrl = Platform.OS === 'web' ? 'http://localhost:5000/api' : 'http://192.168.0.103:5000/api';
const apiUrl = 'https://bookquest-backend.onrender.com/api';

const api = axios.create({
  baseURL: apiUrl, 
  responseType: 'json',
  withCredentials: true,
});

api.interceptors.response.use(
     response => response,
     error => {
      if (error.response) {
        console.error('API error response:', error.response.status, error.response.data);
      } else {
        console.error('API error without response:', error.message);
      }
      return Promise.reject(error);
     }
);

export default api;