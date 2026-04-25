require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import API handlers
const healthHandler = require('./api/health');
const contactIndexHandler = require('./api/contact/index');
const projectsIndexHandler = require('./api/projects/index');
const reviewsIndexHandler = require('./api/reviews/index');

// Health endpoint
app.all('/api/health', healthHandler);

// Contact endpoints
app.all('/api/contact', contactIndexHandler);
app.all('/api/contact/:id', async (req, res) => {
  try {
    const contactIdHandler = require('./api/contact/[id]');
    await contactIdHandler(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
});

// Projects endpoints
app.all('/api/projects', projectsIndexHandler);
app.all('/api/projects/:id', async (req, res) => {
  try {
    const projectIdHandler = require('./api/projects/[id]');
    await projectIdHandler(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
});

// Reviews endpoints
app.all('/api/reviews', reviewsIndexHandler);
app.all('/api/reviews/:id', async (req, res) => {
  try {
    const reviewIdHandler = require('./api/reviews/[id]');
    await reviewIdHandler(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ Development server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Contact: http://localhost:${PORT}/api/contact\n`);
});
