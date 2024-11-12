import axios from 'axios';

const api = axios.create({
  baseURL: /*process.env.REACT_APP_API_BASE_URL ||*/ 'http://192.168.0.104:5000/api', 
  responseType: 'json',
  withCredentials: true,
 /* headers: {
     'Content-Type': 'application/json',
  },*/  
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