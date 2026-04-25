const dotenv = require('dotenv');

dotenv.config();

const corsMiddleware = require('../middleware/cors');
const { contactValidationRules, validate } = require('../middleware/validate');
const { sendContactNotification, sendClientConfirmation } = require('../utils/emailService');

module.exports = async (req, res) => {
  // Handle CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  try {
    // Validate request body
    const validationRules = contactValidationRules();
    for (const rule of validationRules) {
      await rule.run(req);
    }

    const errors = require('express-validator').validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Send email notification to admin
    await sendContactNotification({
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
    });

    // Send confirmation email to client
    await sendClientConfirmation({
      name,
      email,
      service: service || '',
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.',
      data: {
        name,
        email,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Email send error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email. Please try again later.',
    });
  }
};
