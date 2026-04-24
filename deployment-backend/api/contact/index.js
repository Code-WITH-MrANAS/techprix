require('dotenv').config();
const connectDB = require('../config/db');
const Contact = require('../models/Contact');
const { sendContactNotification, sendClientConfirmation } = require('../utils/emailService');
const { getCorsMiddleware, setCorsHeaders } = require('../middleware/cors');

// Manual validation function for serverless
const validateContactData = (data) => {
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

  // Phone validation (optional)
  if (data.phone && data.phone.length > 20) {
    errors.push('Phone cannot exceed 20 characters');
  }

  // Service validation
  if (data.service) {
    const validServices = ['', 'Web Development', 'Mobile App', 'Digital Marketing', 'Brand & Design', 'SEO Optimization', '3D Web Experience', 'Other'];
    if (!validServices.includes(data.service)) {
      errors.push('Invalid service option');
    }
  }

  // Message validation
  if (!data.message || !data.message.trim()) {
    errors.push('Message is required');
  } else if (data.message.length > 2000) {
    errors.push('Message cannot exceed 2000 characters');
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
    await connectDB();

    // POST - Submit new contact
    if (req.method === 'POST') {
      // Validate request data
      const validation = validateContactData(req.body);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
      }

      const { name, email, phone, service, message } = req.body;

      const contact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: (phone || '').trim(),
        service: service || '',
        message: message.trim(),
        ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '',
      });

      // Send emails (non-blocking)
      sendContactNotification({ name: name.trim(), email: email.trim(), phone: (phone || '').trim(), service: service || '', message: message.trim() });
      sendClientConfirmation({ name: name.trim(), email: email.trim(), service: service || '' });

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
    }

    // GET - Retrieve all contacts (admin)
    if (req.method === 'GET') {
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
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process contact request',
      error: error.message,
    });
  }
};
