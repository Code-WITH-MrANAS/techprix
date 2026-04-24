require('dotenv').config();
const { body, validationResult } = require('express-validator');
const connectDB = require('../config/db');
const Review = require('../models/Review');
const getCorsMiddleware = require('../middleware/cors');

// Validation middleware
const reviewValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Company name cannot exceed 150 characters'),
  body('role')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Role cannot exceed 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Rating must be between 1 and 5'),
  body('review')
    .trim()
    .notEmpty()
    .withMessage('Review text is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review must be between 10 and 1000 characters'),
  body('service')
    .optional()
    .trim()
    .isIn(['Web Development', 'Mobile Apps', 'Digital Marketing', 'Brand & Design', 'SEO Optimization', '3D Web Experience', 'Other'])
    .withMessage('Invalid service option'),
];

const validateRequest = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { valid: false, errors: errors.array().map((err) => err.msg) };
  }
  return { valid: true };
};

module.exports = async (req, res) => {
  // Apply CORS
  const corsMiddleware = getCorsMiddleware();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    await connectDB();

    // POST - Submit new review
    if (req.method === 'POST') {
      // Run validations
      for (const validation of reviewValidation) {
        await validation.run(req);
      }

      const validation = await validateRequest(req);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
      }

      const { name, email, company, role, rating, review, service } = req.body;

      const newReview = await Review.create({
        name,
        email,
        company: company || '',
        role: role || '',
        rating,
        review,
        service: service || 'Other',
        ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '',
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for your review! It will be reviewed and published shortly.',
        data: {
          id: newReview._id,
          name: newReview.name,
          createdAt: newReview.createdAt,
        },
      });
    }

    // GET - Retrieve all approved reviews
    if (req.method === 'GET') {
      const { featured } = req.query;

      const filter = {};
      if (featured === 'true') {
        filter.featured = true;
      }

      const reviews = await Review.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .limit(featured === 'true' ? 6 : 100)
        .select('-ipAddress -email');

      return res.status(200).json({
        success: true,
        data: reviews,
        count: reviews.length,
      });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error) {
    console.error('Reviews API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process review request',
      error: error.message,
    });
  }
};
