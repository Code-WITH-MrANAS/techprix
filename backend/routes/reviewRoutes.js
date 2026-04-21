const express = require('express');
const { body } = require('express-validator');
const {
  submitReview,
  getApprovedReviews,
  getReview,
} = require('../controllers/reviewController');
const validate = require('../middleware/validate');

const router = express.Router();

// Validation rules for review submission
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
    .withMessage('Review is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review must be between 10 and 1000 characters'),
  body('service')
    .optional()
    .trim()
    .isIn(['Web Development', 'Mobile Apps', 'Digital Marketing', 'Brand & Design', 'SEO Optimization', '3D Web Experiences', 'Other'])
    .withMessage('Invalid service option'),
];

// Public routes
router.post('/', reviewValidation, validate, submitReview);
router.get('/', getApprovedReviews);
router.get('/:id', getReview);

module.exports = router;
