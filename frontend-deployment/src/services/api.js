import axios from 'axios';

// In development, Vite proxy forwards /api → http://localhost:5000/api
// In production, set VITE_API_URL to your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Submit the contact form
 * @param {Object} formData - { name, email, phone?, service?, message }
 * @returns {Promise<Object>} - Backend response data
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    // Extract the most useful error message from the backend response
    if (error.response?.data) {
      const data = error.response.data;
      const message =
        data.errors?.join(', ') ||
        data.message ||
        'Something went wrong. Please try again.';
      throw new Error(message);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    if (!error.response) {
      throw new Error('Cannot reach the server. Please try again later.');
    }
    throw new Error('Something went wrong. Please try again.');
  }
};

/**
 * Fetch projects from the backend
 * @returns {Promise<Array>} - Array of project objects
 */
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data?.data || response.data;
  } catch (error) {
    throw new Error('Failed to load projects.');
  }
};

/**
 * Check backend health
 * @returns {Promise<Object>}
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend is not reachable.');
  }
};

/**
 * Submit a review
 * @param {Object} formData - { name, email, company?, role?, rating, review, service? }
 * @returns {Promise<Object>} - Backend response data
 */
export const submitReview = async (formData) => {
  try {
    const response = await api.post('/reviews', formData);
    return response.data;
  } catch (error) {
    // Extract the most useful error message from the backend response
    if (error.response?.data) {
      const data = error.response.data;
      const message =
        data.errors?.join(', ') ||
        data.message ||
        'Something went wrong. Please try again.';
      throw new Error(message);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    if (!error.response) {
      throw new Error('Cannot reach the server. Please try again later.');
    }
    throw new Error('Something went wrong. Please try again.');
  }
};

/**
 * Fetch approved reviews from the backend
 * @param {boolean} featured - If true, fetch only featured reviews
 * @returns {Promise<Array>} - Array of review objects
 */
export const fetchReviews = async (featured = false) => {
  try {
    const params = featured ? '?featured=true' : '';
    console.log(`🔗 API: GET /reviews${params}`);
    const response = await api.get(`/reviews${params}`);
    console.log('📦 API Response:', response.data);
    return response.data?.data || response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response?.status === 404) {
      throw new Error('Reviews endpoint not found (404)');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - server took too long to respond');
    }
    if (!error.response) {
      throw new Error('Cannot reach the server - connection failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to load reviews.');
  }
};
