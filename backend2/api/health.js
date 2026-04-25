const dotenv = require('dotenv');

dotenv.config();

const corsMiddleware = require('../middleware/cors');

module.exports = async (req, res) => {
  // Handle CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({
      success: true,
      message: 'Backend Email Service is running',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      endpoints: {
        sendEmail: '/api/send-email',
        health: '/api/health',
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Health check failed',
    });
  }
};
