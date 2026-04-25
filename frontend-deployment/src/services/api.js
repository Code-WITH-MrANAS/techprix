import axios from 'axios';

// Backend2 Email Service URL
const BACKEND2_URL = import.meta.env.VITE_BACKEND2_URL || 'http://localhost:5000';

// Main API instance (if needed for other endpoints)
const API_URL = import.meta.env.VITE_API_URL || '/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Backend2 Email Service instance
const emailApi = axios.create({
  baseURL: BACKEND2_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Submit the contact form via Backend2 email service
 * @param {Object} formData - { name, email, phone?, service?, message }
 * @returns {Promise<Object>} - Backend response data
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await emailApi.post('/api/send-email', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      service: formData.service || '',
      message: formData.message,
    });
    return response.data;
  } catch (error) {
    // Extract the most useful error message from the backend response
    if (error.response?.data) {
      const data = error.response.data;
      let message = 'Something went wrong. Please try again.';
      
      if (Array.isArray(data.errors)) {
        message = data.errors.map(e => e.message || e).join(', ');
      } else if (data.errors?.join) {
        message = data.errors.join(', ');
      } else if (data.message) {
        message = data.message;
      }
      
      throw new Error(message);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    if (!error.response) {
      throw new Error('Cannot reach the backend. Please check if Backend2 is running.');
    }
    throw new Error('Something went wrong. Please try again.');
  }
};
