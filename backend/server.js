const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===== Middleware =====

// CORS - allow frontend (MUST be before helmet for preflight to work)
const defaultOrigins = [
  'https://www.techprix.online',
  'https://techprix.online',
  'http://localhost:5173',
];
const envOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
  : [];
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, server-to-server)
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
  })
);

// Handle preflight OPTIONS requests explicitly
app.options('*', cors());

// Security headers (after CORS so preflight isn't blocked)
app.use(helmet());

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TechPrix API is running',
    timestamp: new Date().toISOString(),
  });
});

// Contact API
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

// ===== Start Server =====
// Only listen when running locally (Vercel handles this automatically)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`
  🚀 TechPrix API Server
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🌐 Port:        ${PORT}
  📝 Environment: ${process.env.NODE_ENV || 'development'}
  🔗 Health:      http://localhost:${PORT}/api/health
  📬 Contact API: http://localhost:${PORT}/api/contact
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  });
}

module.exports = app;
