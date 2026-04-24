import cors from 'cors';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import connectDB from '../../config/db';
import Contact from '../../models/Contact';
import { sendContactNotification, sendClientConfirmation } from '../../utils/emailService';

dotenv.config();

const getCorsMiddleware = () => {
  const defaultOrigins = [
    'https://www.techprix.online',
    'https://techprix.online',
    'http://localhost:5173',
  ];
  const envOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
    : [];
  const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
};

const corsMiddleware = getCorsMiddleware();

export default async function handler(req, res) {
  // Enable CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
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
}

async function submitContact(req, res) {
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
    sendContactNotification({ name, email, phone: phone || '', service: service || '', message }).catch(
      (err) => console.error('Failed to send notification email:', err)
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
