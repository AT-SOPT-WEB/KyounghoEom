import axios from 'axios';
import { STORAGE_KEYS } from '../constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL environment variable is required');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      config.data
    );
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    if (userId && config.headers) {
      config.headers['userId'] = userId;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.baseURL}${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('[API Error]', error.response?.status, error.config?.method?.toUpperCase(), error.config?.url, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.USER_ID);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 