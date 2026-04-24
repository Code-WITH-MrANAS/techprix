require('dotenv').config();
const { body, validationResult } = require('express-validator');
const connectDB = require('../config/db');
const Contact = require('../models/Contact');
const { sendContactNotification, sendClientConfirmation } = require('../utils/emailService');
const { getCorsMiddleware, setCorsHeaders } = require('../middleware/cors');

// Validation middleware
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
  body('phone').optional().trim(),
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

module.exports = async (req, res) => {
  // Set CORS headers on all responses
  setCorsHeaders(req, res);

  // Apply CORS middleware
  const corsMiddleware = getCorsMiddleware();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    await connectDB();

    if (req.method === 'POST') {
      return await submitContact(req, res);
    } else if (req.method === 'GET') {
      return await getContacts(req, res);
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

async function submitContact(req, res) {
  // Run validations
  for (const validation of contactValidation) {
    await validation.run(req);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => err.msg),
    });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
      ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '',
    });

    // Send emails (non-blocking)
    sendContactNotification({ name, email, phone: phone || '', service: service || '', message }).catch((err) =>
      console.error('Failed to send notification email:', err)
    );
    sendClientConfirmation({ name, email, service: service || '' }).catch((err) =>
      console.error('Failed to send confirmation email:', err)
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 2 hours.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

async function getContacts(req, res) {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts.',
    });
  }
}
