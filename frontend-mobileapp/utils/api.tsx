import axios from 'axios';
import { Platform } from 'react-native';

const apiUrl = Platform.OS === 'web' ? 'http://localhost:5000/api' : 'http://192.168.0.103:5000/api';

const api = axios.create({
  baseURL: apiUrl, 
  responseType: 'json',
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
     response => response,
     error => {
       console.error('API error:', error, error.response.data);
       return Promise.reject(error);
     }
);

export default api;