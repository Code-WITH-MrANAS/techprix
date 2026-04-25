const cors = require('cors');

// CORS configuration for email service
const corsMiddleware = cors({
  origin: (origin, callback) => {
    const defaultOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000',
      /^https:\/\/.*\.vercel\.app$/,
      /^https:\/\/.*\.techprix\.online$/,
    ];

    const envOrigins = process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
      : [];

    const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if origin matches any allowed origins
    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = corsMiddleware;
