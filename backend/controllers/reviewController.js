const Review = require('../models/Review');

// @desc    Submit a new review
// @route   POST /api/reviews
// @access  Public
const submitReview = async (req, res) => {
  try {
    const { name, email, company, role, rating, review, service } = req.body;

    const newReview = await Review.create({
      name,
      email,
      company: company || '',
      role: role || '',
      rating,
      review,
      service: service || 'Other',
      ipAddress: req.ip || req.connection?.remoteAddress || '',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It will be reviewed and published shortly.',
      data: {
        id: newReview._id,
        name: newReview.name,
        createdAt: newReview.createdAt,
      },
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    console.error('Review submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// @desc    Get all approved reviews (public)
// @route   GET /api/reviews
// @access  Public
const getApprovedReviews = async (req, res) => {
  try {
    const { featured } = req.query;

    const filter = { approved: true };
    if (featured === 'true') {
      filter.featured = true;
    }

    const reviews = await Review.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(featured === 'true' ? 6 : 100);

    res.status(200).json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reviews.',
    });
  }
};

// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || !review.approved) {
      return res.status(404).json({
        success: false,
        message: 'Review not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve review.',
    });
  }
};

module.exports = {
  submitReview,
  getApprovedReviews,
  getReview,
};
