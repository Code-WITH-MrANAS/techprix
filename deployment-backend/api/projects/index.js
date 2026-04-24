require('dotenv').config();
const { getCorsMiddleware, setCorsHeaders } = require('../middleware/cors');

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

  // Only GET method allowed to fetch projects list
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  }

  try {
    // Return empty projects list - Projects are managed separately
    return res.status(200).json({
      success: true,
      data: [],
      count: 0,
      message: 'Projects endpoint is available. Currently no projects listed.',
    });
  } catch (error) {
    console.error('Projects API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: error.message,
    });
  }
};
