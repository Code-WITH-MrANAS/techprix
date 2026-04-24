# Serverless Backend - Quick Start Guide

## What Changed?

Your backend is now **serverless** and ready for Vercel!

### Old Structure (Traditional Server)
```
server.js (single entry point)
├── routes/
├── controllers/
└── middleware/
```

### New Structure (Serverless)
```
api/ (automatic routing)
├── health.js           → GET /api/health
├── contact/
│   ├── index.js        → GET/POST /api/contact
│   └── [id].js         → GET/PATCH/DELETE /api/contact/:id
├── projects/
│   ├── index.js        → GET /api/projects
│   └── [id].js         → GET /api/projects/:id
└── reviews/
    ├── index.js        → GET/POST /api/reviews
    └── [id].js         → GET /api/reviews/:id
```

## 5-Minute Setup

### Step 1: Set Environment Variables
```bash
# Create .env.local with these values:
MONGODB_URI=your-mongodb-connection-string
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
EMAIL_RECEIVER=admin@techprix.com
CLIENT_URL=https://www.techprix.online,http://localhost:5173
```

### Step 2: Deploy to Vercel

**Option A - Via CLI (Easy)**
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts and set env vars in Vercel dashboard
vercel --prod
```

**Option B - Via GitHub (Recommended)**
1. Push to GitHub
2. Go to vercel.com → New Project → Select repo
3. Set ROOT DIRECTORY: `/deployment backend`
4. Add environment variables
5. Click Deploy

### Step 3: Update Frontend
```javascript
// Update frontend/src/services/api.js
const API_BASE_URL = 'https://your-project.vercel.app/api';
```

## API Endpoints (Same as Before!)

```
GET  /api/health                    # Health check
POST /api/contact                   # Submit contact
GET  /api/contact                   # Get all contacts
GET  /api/contact/:id               # Get one contact
PATCH /api/contact/:id              # Update contact
DELETE /api/contact/:id             # Delete contact

POST /api/reviews                   # Submit review
GET  /api/reviews                   # Get all reviews
GET  /api/reviews/:id               # Get one review

GET  /api/projects                  # Get all projects
GET  /api/projects/:id              # Get one project
```

## Key Files Changed

- **Old**: `server.js` → **New**: Each `api/` file is a function
- **Middleware**: Now in each function instead of global
- **Models/Utils**: Same, just reorganized

## Need Help?

1. Check logs: `vercel logs`
2. Verify env vars in Vercel dashboard
3. Test MongoDB connection
4. Read full README.md for detailed setup

**Next Steps**: Deploy to Vercel and update your frontend!
