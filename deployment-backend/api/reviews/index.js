require('dotenv').config();
const { saveToFile, readFromFile } = require('../../utils/fileStorage');
const { getCorsMiddleware, setCorsHeaders } = require('../../middleware/cors');

// Manual validation function for serverless
const validateReviewData = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Company validation
  if (data.company && data.company.length > 150) {
    errors.push('Company name cannot exceed 150 characters');
  }

  // Role validation
  if (data.role && data.role.length > 100) {
    errors.push('Role cannot exceed 100 characters');
  }

  // Rating validation
  if (!data.rating) {
    errors.push('Rating is required');
  } else if (![1, 2, 3, 4, 5].includes(Number(data.rating))) {
    errors.push('Rating must be between 1 and 5');
  }

  // Review validation
  if (!data.review || !data.review.trim()) {
    errors.push('Review text is required');
  } else if (data.review.length < 10) {
    errors.push('Review must be at least 10 characters');
  } else if (data.review.length > 1000) {
    errors.push('Review cannot exceed 1000 characters');
  }

  // Service validation
  if (data.service) {
    const validServices = ['Web Development', 'Mobile Apps', 'Digital Marketing', 'Brand & Design', 'SEO Optimization', '3D Web Experience', 'Other'];
    if (!validServices.includes(data.service)) {
      errors.push('Invalid service option');
    }
  }

  return { valid: errors.length === 0, errors };
};

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
    // POST - Submit new review
    if (req.method === 'POST') {
      // Validate request data
      const validation = validateReviewData(req.body);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
      }

      const { name, email, company, role, rating, review, service } = req.body;

      const newReview = saveToFile('reviews.txt', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: (company || '').trim(),
        role: (role || '').trim(),
        rating: Number(rating),
        review: review.trim(),
        service: service || 'Other',
        ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '',
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for your review! It will be reviewed and published shortly.',
        data: {
          id: newReview.id,
          name: newReview.name,
          createdAt: newReview.createdAt,
        },
      });
    }

    // GET - Retrieve all reviews
    if (req.method === 'GET') {
      const reviews = readFromFile('reviews.txt');

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
