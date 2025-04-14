import axios from 'axios';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.error('Session expirée. Veuillez vous reconnecter.');
      window.location.href = '/login';
    }
    
    // Gérer les erreurs générales
    const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default axios; 