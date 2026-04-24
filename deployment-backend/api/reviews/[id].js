require('dotenv').config();
const { getById } = require('../../utils/fileStorage');
const { getCorsMiddleware, setCorsHeaders } = require('../../middleware/cors');

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
    const { id } = req.query;

    if (req.method === 'GET') {
      const review = getById('reviews.txt', id);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: review,
      });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error) {
    console.error('Review Detail API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve review',
      error: error.message,
    });
  }
};
