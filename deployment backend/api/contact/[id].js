require('dotenv').config();
const connectDB = require('../../config/db');
const Contact = require('../../models/Contact');
const getCorsMiddleware = require('../../middleware/cors');

module.exports = async (req, res) => {
  // Apply CORS
  const corsMiddleware = getCorsMiddleware();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    await connectDB();
    const { id } = req.query;

    // GET - Retrieve single contact
    if (req.method === 'GET') {
      const contact = await Contact.findById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: contact,
      });
    }

    // PATCH - Update contact status
    if (req.method === 'PATCH') {
      const { status } = req.body;

      if (!status || !['new', 'read', 'replied', 'archived'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value',
        });
      }

      const contact = await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Contact updated successfully',
        data: contact,
      });
    }

    // DELETE - Delete contact
    if (req.method === 'DELETE') {
      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
      });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error) {
    console.error('Contact Detail API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process contact request',
      error: error.message,
    });
  }
};
