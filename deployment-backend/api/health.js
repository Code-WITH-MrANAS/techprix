require('dotenv').config();
const connectDB = require('../config/db');
const { getCorsMiddleware, setCorsHeaders } = require('../middleware/cors');

// Health check endpoint
module.exports = async (req, res) => {
  // Set CORS headers on all responses
  setCorsHeaders(req, res);

  // Apply CORS middleware
  const corsMiddleware = getCorsMiddleware();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: 'TechPrix API is running 🚀',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Service unavailable',
      error: error.message,
    });
  }
};
