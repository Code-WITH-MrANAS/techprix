const cors = require('cors');

const getCorsMiddleware = () => {
  const defaultOrigins = [
    'https://www.techprix.online',
    'https://techprix.online',
    'http://localhost:5173',
    'http://localhost:3000',
    // Allow all Vercel preview deployments and production
    /^https:\/\/.*\.vercel\.app$/,
  ];
  const envOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
    : [];
  const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, server-to-server)
      if (!origin) {
        callback(null, true);
        return;
      }

      // Check if origin matches any allowed origins (including regex patterns)
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });

      if (isAllowed) {
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

module.exports = getCorsMiddleware;
