# TechPrix Backend - Serverless Deployment (Vercel)

## Overview

This is a **serverless version** of the TechPrix backend optimized for deployment on **Vercel**. It converts the traditional Express.js server into serverless functions that run on Vercel's infrastructure.

## Key Differences from Standard Backend

✅ **Serverless Functions**: Each API route is a separate serverless function  
✅ **Auto-scaling**: Automatically scales based on demand  
✅ **No Server Maintenance**: Vercel handles infrastructure  
✅ **CORS-enabled**: Pre-configured for your frontend  
✅ **MongoDB Atlas**: Connects to MongoDB without concerns about connection pooling  

## Project Structure

```
deployment backend/
├── api/                      # Serverless API handlers
│   ├── health.js            # Health check endpoint
│   ├── contact/
│   │   ├── index.js         # POST (submit) & GET (list)
│   │   └── [id].js          # GET, PATCH, DELETE single contact
│   ├── projects/
│   │   ├── index.js         # GET all projects
│   │   └── [id].js          # GET single project
│   └── reviews/
│       ├── index.js         # POST (submit) & GET (list)
│       └── [id].js          # GET single review
├── config/
│   └── db.js                # MongoDB connection
├── middleware/
│   ├── cors.js              # CORS configuration
│   ├── errorHandler.js      # Error handling
│   └── validate.js          # Request validation
├── models/
│   ├── Contact.js           # Contact schema
│   ├── Project.js           # Project schema
│   └── Review.js            # Review schema
├── utils/
│   └── emailService.js      # Email sending utility
├── package.json             # Dependencies
├── vercel.json              # Vercel configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Contact (Messages)
- `POST /api/contact` - Submit new contact message
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/[id]` - Get single contact
- `PATCH /api/contact/[id]` - Update contact status
- `DELETE /api/contact/[id]` - Delete contact

### Projects
- `GET /api/projects` - Get all active projects
- `GET /api/projects/[id]` - Get single project

### Reviews
- `POST /api/reviews` - Submit new review
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/[id]` - Get single review

## Setup Instructions

### 1. Prerequisites

- A **Vercel account** (free tier available at [vercel.com](https://vercel.com))
- A **MongoDB Atlas database** (free tier at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas))
- A **Gmail account** for email notifications (Gmail app password required)
- **Node.js 18+** installed locally (for testing)

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then update each variable:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techprix?retryWrites=true&w=majority

# Gmail SMTP (NOT your regular password!)
# Generate app password: https://myaccount.google.com/apppasswords
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password

# Where to send contact notifications
EMAIL_RECEIVER=admin@techprix.com

# Frontend URLs (comma-separated)
CLIENT_URL=https://www.techprix.online,https://techprix.online,http://localhost:5173

# Environment
NODE_ENV=production
```

### 3. MongoDB Setup

1. Go to [MongoDB Atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Add a database user (remember username & password)
4. Whitelist your IP:
   - Click "Network Access"
   - Click "Add IP Address"
   - For Vercel: **Add 0.0.0.0/0** (allows all IPs)
   - Or specifically add Vercel's IP ranges
5. Get your connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Replace `<dbname>` with `techprix`

### 4. Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an app password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click "App passwords" (only visible if 2FA is enabled)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

### 5. Deployment to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set up production environment variables
vercel env add MONGODB_URI
vercel env add EMAIL_USER
vercel env add EMAIL_APP_PASSWORD
vercel env add EMAIL_RECEIVER
vercel env add CLIENT_URL

# Deploy to production
vercel --prod
```

#### Option B: Using Git (GitHub/GitLab)

1. Push this folder to your GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Framework: **Other (Node.js)**
6. Root Directory: `/deployment backend`
7. Add environment variables in Vercel dashboard
8. Click "Deploy"

### 6. Testing Locally

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Tests endpoints at http://localhost:3000
```

## Updating Your Frontend

Update your frontend API base URL to your Vercel deployment:

```javascript
// services/api.js
const API_BASE_URL = 'https://your-project.vercel.app/api';

export const fetchReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews`);
  return response.json();
};
```

## Important Notes

⚠️ **CORS Configuration**: Frontend URLs are hardcoded in `middleware/cors.js`. Update them with your actual domain.

⚠️ **Serverless Timeout**: Functions timeout after 30 seconds. Keep API responses fast.

⚠️ **Cold Starts**: First request after deployment may take 5-10 seconds (normal for serverless).

⚠️ **Database Connections**: Connection pooling is optimized for serverless in `config/db.js`.

## Troubleshooting

### "MONGODB_URI is not defined"
- Make sure environment variables are set in Vercel project settings
- Check that `.env.local` has correct connection string

### "Email notification failed"
- Verify Gmail app password (not regular password)
- Check EMAIL_USER is correct
- Ensure 2FA is enabled on Gmail account

### "CORS blocked origin"
- Add your frontend URL to `middleware/cors.js`
- Or use the `CLIENT_URL` environment variable

### Endpoints return 504 timeout
- Check MongoDB connection (ensure IP whitelist includes 0.0.0.0/0)
- Reduce query complexity
- Check Vercel logs: `vercel logs`

## Monitoring

View real-time logs in Vercel:

```bash
vercel logs
```

Or through the Vercel dashboard:
1. Go to your project
2. Click "Deployments"
3. Select latest deployment
4. Click "Logs"

## Updating the API

After making changes:

```bash
# Test locally
npm run dev

# Deploy
vercel --prod
```

## Support

For issues:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables in Vercel dashboard
3. Test MongoDB connection with MongoDB Compass
4. Check CORS configuration in `middleware/cors.js`

---

**Happy deploying!** 🚀
