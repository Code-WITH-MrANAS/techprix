# Backend2 - Email Service

A lightweight, focused backend service for handling email notifications for the TechPrix frontend-deployment. This service integrates with the frontend to send automated emails for contact form submissions.

## Features

✅ **Automated Email Notifications** - Send emails to admin when contact form is submitted
✅ **Client Confirmation Emails** - Send confirmation emails to clients
✅ **Email Validation** - Built-in validation for contact form data
✅ **CORS Enabled** - Secure cross-origin requests
✅ **Vercel Ready** - Deploy to Vercel with zero configuration
✅ **Lightweight** - Minimal dependencies, focused on email service only

## Project Structure

```
backend2/
├── api/
│   ├── health.js          # Health check endpoint (Vercel)
│   └── send-email.js      # Email sending endpoint (Vercel)
├── middleware/
│   ├── cors.js            # CORS configuration
│   ├── errorHandler.js    # Error handling
│   └── validate.js        # Input validation
├── utils/
│   └── emailService.js    # Email service utilities
├── dev-server.js          # Local development server
├── package.json
├── vercel.json
├── .env
├── .env.example
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend2
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

**Required Variables:**
- `EMAIL_USER` - Your Gmail address
- `EMAIL_APP_PASSWORD` - Gmail app-specific password (not your regular password)
- `EMAIL_RECEIVER` - Email address to receive contact form submissions
- `CLIENT_URL` - Frontend URLs for CORS (comma-separated)

### 3. Gmail Setup

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use this app password in `.env` as `EMAIL_APP_PASSWORD`

## Local Development

Run the development server with auto-reload:

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

Check if the service is running.

**Response:**
```json
{
  "success": true,
  "message": "Backend Email Service is running",
  "status": "healthy",
  "timestamp": "2024-04-25T10:30:00.000Z"
}
```

### Send Email
```
POST /api/send-email
```

Send contact form email to admin and confirmation to client.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Web Development",
  "message": "I'm interested in your services..."
}
```

**Required Fields:**
- `name` - (2-100 characters)
- `email` - Valid email address
- `message` - (10-5000 characters)

**Optional Fields:**
- `phone` - Valid phone format
- `service` - Service type

**Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully...",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2024-04-25T10:30:00.000Z"
  }
}
```

## Integration with Frontend

Update your frontend API client to use this backend:

```javascript
// services/api.js
export const sendContactEmail = async (data) => {
  const response = await axios.post(
    'http://localhost:5000/api/send-email',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
```

Or for production:

```javascript
export const sendContactEmail = async (data) => {
  const response = await axios.post(
    'https://your-backend2-url.vercel.app/api/send-email',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial backend2 setup"
git push origin main
```

### 2. Deploy to Vercel

Option A: Using Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import from GitHub
4. Select the repository
5. Add environment variables in "Environment Variables"
6. Deploy

### 3. Add Environment Variables on Vercel

In Vercel Dashboard → Settings → Environment Variables, add:
- `EMAIL_USER`
- `EMAIL_APP_PASSWORD`
- `EMAIL_RECEIVER`
- `CLIENT_URL`

## Testing

### Using cURL
```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "service": "Web Development",
    "message": "This is a test message."
  }'
```

### Using Postman

1. Create a POST request to `http://localhost:5000/api/send-email`
2. Set Body → raw → JSON
3. Add the request data
4. Send

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Validation error
- `405` - Method not allowed
- `500` - Server error

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Troubleshooting

### Emails not sending?
- Check Gmail app password is correct
- Verify 2-Step Verification is enabled on Gmail
- Check spam folder for test emails
- Verify `EMAIL_RECEIVER` is set correctly

### CORS errors?
- Add your frontend URL to `CLIENT_URL` in `.env`
- Ensure frontend is making requests to the correct backend URL
- Check browser console for detailed CORS error

### Validation errors?
- Ensure all required fields are provided
- Check field lengths match validation rules
- Verify email format is correct

## License

ISC

## Support

For issues or questions, contact: your-email@example.com
