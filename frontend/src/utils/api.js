import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - backend may be down');
      return Promise.reject({
        message: 'Cannot connect to server. Please make sure the backend is running.',
        isNetworkError: true
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

