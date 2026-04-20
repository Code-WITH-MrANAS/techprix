const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const validate = require('../middleware/validate');

const router = express.Router();

// Validation rules for contact submission
const contactValidation = [
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
  body('phone')
    .optional()
    .trim(),
  body('service')
    .optional()
    .trim()
    .isIn(['', 'Web Development', 'Mobile App', 'Digital Marketing', 'Brand & Design', 'SEO Optimization', '3D Web Experience', 'Other'])
    .withMessage('Invalid service option'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
];

// Public route
router.post('/', contactValidation, validate, submitContact);

// Admin routes (in production, add auth middleware here)
router.get('/', getContacts);
router.get('/:id', getContact);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
