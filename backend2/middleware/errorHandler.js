// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
