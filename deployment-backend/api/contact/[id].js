require('dotenv').config();
const { getById, deleteById } = require('../../utils/fileStorage');
const { getCorsMiddleware, setCorsHeaders } = require('../../middleware/cors');

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
    const { id } = req.query;

    // GET - Retrieve single contact
    if (req.method === 'GET') {
      const contact = getById('contacts.txt', id);

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

    // DELETE - Delete contact
    if (req.method === 'DELETE') {
      const deleted = deleteById('contacts.txt', id);

      if (!deleted) {
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
