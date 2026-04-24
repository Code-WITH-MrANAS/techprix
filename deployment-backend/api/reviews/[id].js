require('dotenv').config();
const connectDB = require('../../config/db');
const Review = require('../../models/Review');
const getCorsMiddleware = require('../../middleware/cors');

module.exports = async (req, res) => {
  // Apply CORS
  const corsMiddleware = getCorsMiddleware();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === 'GET') {
      const review = await Review.findById(id);

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
