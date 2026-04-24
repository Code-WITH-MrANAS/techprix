# Deployment Backend - File Structure

## Complete Directory Layout

```
deployment-backend/
│
├── 📁 api/                              # Serverless Functions (Vercel routes)
│   ├── health.js                        # GET /api/health
│   │
│   ├── 📁 contact/                      # Contact endpoints
│   │   ├── index.js                     # GET/POST /api/contact
│   │   └── [id].js                      # GET/PATCH/DELETE /api/contact/:id
│   │
│   ├── 📁 projects/                     # Project endpoints
│   │   ├── index.js                     # GET /api/projects
│   │   └── [id].js                      # GET /api/projects/:id
│   │
│   └── 📁 reviews/                      # Review endpoints
│       ├── index.js                     # GET/POST /api/reviews
│       └── [id].js                      # GET /api/reviews/:id
│
├── 📁 config/                           # Configuration Files
│   └── db.js                            # MongoDB connection setup
│
├── 📁 middleware/                       # Custom Middleware
│   ├── cors.js                          # CORS configuration
│   ├── errorHandler.js                  # Error handling middleware
│   └── validate.js                      # Request validation
│
├── 📁 models/                           # MongoDB Schemas
│   ├── Contact.js                       # Contact model
│   ├── Project.js                       # Project model
│   └── Review.js                        # Review model
│
├── 📁 utils/                            # Utility Functions
│   └── emailService.js                  # Email sending (Gmail SMTP)
│
├── 📄 package.json                      # Dependencies & scripts
├── 📄 vercel.json                       # Vercel deployment config
├── 📄 .env.example                      # Environment variables template
├── 📄 .gitignore                        # Git ignore file
├── 📄 README.md                         # Full setup documentation
├── 📄 DEPLOYMENT_GUIDE.md               # Quick start guide
├── 📄 pre-deploy.sh                     # Pre-deployment checklist
└── 📄 FILE_STRUCTURE.md                 # This file
```

## Key Changes from Original Backend

### Routes Structure
```
OLD (Traditional Server):
server.js
  ├── app.use('/api/contact', contactRoutes)
  ├── app.use('/api/projects', projectRoutes)
  └── app.use('/api/reviews', reviewRoutes)

NEW (Serverless):
api/
  ├── contact/index.js    (replaces contactRoutes)
  ├── projects/index.js   (replaces projectRoutes)
  └── reviews/index.js    (replaces reviewRoutes)
```

### Controller Logic
```
OLD: controllers/contactController.js → Imported by routes

NEW: api/contact/index.js → Directly exported as handler
    api/contact/[id].js    → Dynamic route handler
```

### Middleware Application
```
OLD: Applied globally in server.js

NEW: Applied per-function for serverless efficiency
```

## Environment Variables

Location: `.env.local` (copy from `.env.example`)

```
MONGODB_URI=                # MongoDB connection string
EMAIL_USER=                 # Gmail address for sending
EMAIL_APP_PASSWORD=         # Gmail app password (16 chars)
EMAIL_RECEIVER=             # Email to receive contact forms
CLIENT_URL=                 # Frontend URLs (comma-separated)
NODE_ENV=production         # Environment mode
```

## Dependencies

See `package.json`:
- `express` - Web framework (used in handlers)
- `mongoose` - MongoDB ODM
- `nodemailer` - Email service
- `cors` - Cross-origin support
- `express-validator` - Request validation
- `dotenv` - Environment variables
- `helmet` - Security headers

## API Response Format

All endpoints return JSON:

```json
{
  "success": true/false,
  "message": "Human-readable message",
  "data": { ... },
  "errors": [ ... ]  // Only when validation fails
}
```

## Error Handling

```
400 - Bad Request (validation errors)
404 - Not Found (resource doesn't exist)
405 - Method Not Allowed
500 - Server Error
503 - Service Unavailable (DB connection failed)
```

## Deployment Flow

1. **Local Development**: `npm run dev`
2. **Testing**: Test all endpoints locally
3. **Commit**: Push to Git repository
4. **Deploy**: `vercel --prod` or via GitHub integration
5. **Verify**: Test endpoints on production URL

## File Naming Convention

- `index.js` - Handles multiple HTTP methods (GET, POST)
- `[id].js` - Dynamic routes with ID parameter
- Single method files not needed (use `index.js` instead)

## Important Notes

✅ Each `api/*.js` file is a separate serverless function  
✅ Files in `api/` folder automatically route to `/api/*`  
✅ Folder structure represents URL path (`api/contact/[id].js` → `/api/contact/:id`)  
✅ Database connection pooling is optimized for serverless  
✅ CORS is configured per-function for flexibility  

---

**Ready to deploy?** Start with `DEPLOYMENT_GUIDE.md`
