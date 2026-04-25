# Quick Reference - Backend2 Email Service

## Quick Start

```bash
# 1. Install dependencies
cd backend2
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Gmail credentials

# 3. Run dev server
npm run dev
```

Server runs on: `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/send-email` | Send contact email |

## Send Email Request

```bash
POST /api/send-email
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Web Development",
  "message": "Message content here..."
}
```

## Frontend Integration

```javascript
// In frontend/src/services/api.js

const BACKEND2_URL = process.env.REACT_APP_BACKEND2_URL || 'http://localhost:5000';

export const sendContactEmail = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND2_URL}/api/send-email`,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
```

## Environment Variables

```env
# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx

# Where to send contact notifications
EMAIL_RECEIVER=your-email@gmail.com

# Frontend URLs (comma-separated)
CLIENT_URL=http://localhost:5173,https://your-domain.com

# Server
PORT=5000
NODE_ENV=development
```

## Validation Rules

| Field | Rules |
|-------|-------|
| name | Required, 2-100 characters |
| email | Required, valid email format |
| phone | Optional, valid phone format |
| service | Optional, max 100 characters |
| message | Required, 10-5000 characters |

## Success Response

```json
{
  "success": true,
  "message": "Thank you! Your message has been sent...",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2024-04-25T10:30:00.000Z"
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Deployment

### Vercel Deployment

```bash
# 1. Connect to Vercel
vercel

# 2. Add environment variables in Vercel Dashboard
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECEIVER=your-email@gmail.com
CLIENT_URL=https://your-frontend-url.com

# 3. Deploy
vercel --prod
```

**Your Backend2 URL will be:** `https://backend2-*.vercel.app`

## Emails Sent

✅ **Admin Notification** - Sent to `EMAIL_RECEIVER`
- Subject: "🔔 New Contact: {name} — {service}"
- Contains: Full contact details

✅ **Client Confirmation** - Sent to client's email
- Subject: "✅ We received your message — TechPrix"
- Contains: Acknowledgment and expected response time

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Emails not sending | Check Gmail app password and 2FA enabled |
| CORS error | Add frontend URL to CLIENT_URL in .env |
| Validation error | Check all required fields and field formats |
| 500 error | Check .env variables and email configuration |

## Testing Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Send email
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "service": "Testing",
    "message": "This is a test message."
  }'
```

## File Structure

```
backend2/
├── api/               # Vercel serverless functions
│   ├── health.js
│   └── send-email.js
├── middleware/        # Express middleware
│   ├── cors.js
│   ├── errorHandler.js
│   └── validate.js
├── utils/            # Utility functions
│   └── emailService.js
├── dev-server.js     # Local development server
├── package.json
├── vercel.json
├── .env
├── .env.example
└── README.md
```

## More Info

See [README.md](./README.md) for complete documentation.
