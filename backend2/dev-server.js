const express = require('express');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const { contactValidationRules, validate } = require('./middleware/validate');
const { sendContactNotification, sendClientConfirmation } = require('./utils/emailService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - IMPORTANT: Body parser must be before routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(corsMiddleware);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend Email Service is running',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Send email endpoint
app.post('/api/send-email', contactValidationRules(), validate, async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    console.log('📧 Received contact form:', { name, email, phone, service, messageLength: message?.length });

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

    console.log('✅ Emails sent successfully for:', email);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.',
      data: {
        name,
        email,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Error in send-email:', error.message);
    next(error);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Email Service Backend running on http://localhost:${PORT}`);
  console.log(`📧 POST /api/send-email - Send contact form email`);
  console.log(`💚 GET /api/health - Health check`);
});

module.exports = app;
