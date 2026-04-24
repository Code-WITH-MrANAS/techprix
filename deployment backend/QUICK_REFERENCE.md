# 🚀 TechPrix Serverless Backend - Quick Reference

## Installation & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Test locally
npm run dev
# Visit http://localhost:3000/api/health

# 4. Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

## API Endpoints Quick Reference

### Contact API
```bash
# Submit contact form
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Web Development",
  "message": "I'm interested in your services"
}

# Get all contacts (admin)
GET /api/contact

# Get single contact
GET /api/contact/:id

# Update contact status
PATCH /api/contact/:id
{"status": "read"}  # new, read, replied, archived

# Delete contact
DELETE /api/contact/:id
```

### Projects API
```bash
# Get all active projects
GET /api/projects?featured=true

# Get single project
GET /api/projects/:id
```

### Reviews API
```bash
# Submit review
POST /api/reviews
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Tech Corp",
  "role": "CEO",
  "rating": 5,
  "review": "Excellent work on our project!",
  "service": "Web Development"
}

# Get all reviews
GET /api/reviews?featured=true

# Get single review
GET /api/reviews/:id
```

### Health Check
```bash
GET /api/health
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["field1 is required", "field2 is invalid"]
}
```

## Environment Variables

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/techprix
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx    # 16-char app password
EMAIL_RECEIVER=admin@techprix.com
CLIENT_URL=https://yoursite.com,http://localhost:5173
NODE_ENV=production
```

## File Structure

```
api/
├── health.js                    → /api/health
├── contact/
│   ├── index.js                 → /api/contact (GET/POST)
│   └── [id].js                  → /api/contact/:id (GET/PATCH/DELETE)
├── projects/
│   ├── index.js                 → /api/projects (GET)
│   └── [id].js                  → /api/projects/:id (GET)
└── reviews/
    ├── index.js                 → /api/reviews (GET/POST)
    └── [id].js                  → /api/reviews/:id (GET)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 503 Service Unavailable | Check MongoDB URI and IP whitelist |
| CORS Blocked | Update CLIENT_URL in environment variables |
| Emails not sending | Verify Gmail app password (not regular password) |
| 504 Timeout | Check Vercel logs: `vercel logs` |
| Module not found | Run `npm install` |

## Testing with cURL

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Submit contact
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@example.com",
    "message":"Test message"
  }'

# Get projects
curl https://your-app.vercel.app/api/projects
```

## Testing with Postman

1. Import collection from environment variables
2. Set base URL: `https://your-app.vercel.app/api`
3. Test each endpoint
4. Check request/response in Postman inspector

## MongoDB Setup Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster deployed
- [ ] Database user created
- [ ] IP whitelist: `0.0.0.0/0` (for Vercel)
- [ ] Connection string copied
- [ ] URI format: `mongodb+srv://user:pass@cluster.mongodb.net/techprix`

## Gmail Setup Checklist

- [ ] 2-Factor Authentication enabled
- [ ] App password generated
- [ ] Password is 16 characters
- [ ] Used in EMAIL_APP_PASSWORD (not regular password)
- [ ] EMAIL_USER matches Gmail address

## Deployment Checklist

- [ ] Environment variables set in `.env.local`
- [ ] `.env.local` added to `.gitignore`
- [ ] All tests passing locally
- [ ] Git repository initialized
- [ ] Changes committed
- [ ] Vercel project created
- [ ] Root directory set to `/deployment backend`
- [ ] Environment variables added to Vercel dashboard
- [ ] Deployment successful

## Useful Commands

```bash
# View deployment logs
vercel logs

# View environment variables
vercel env list

# Set environment variable
vercel env add MONGODB_URI

# Delete deployment
vercel remove <deployment-url>

# Local development with hot reload
npm run dev

# Check for errors
vercel build
```

## Performance Tips

⚡ Keep API responses under 1MB  
⚡ Use indexes on MongoDB fields  
⚡ Limit query results  
⚡ Cache static data when possible  
⚡ Monitor cold start times  

## Security Tips

🔒 Use HTTPS only  
🔒 Rotate secrets regularly  
🔒 Whitelist frontend URLs in CORS  
🔒 Validate all inputs  
🔒 Use MongoDB Atlas IP whitelist  
🔒 Never commit `.env` files  

## Support & Resources

📚 [Vercel Docs](https://vercel.com/docs)  
📚 [MongoDB Docs](https://docs.mongodb.com)  
📚 [Express.js Docs](https://expressjs.com)  
📚 [Nodemailer Docs](https://nodemailer.com)  

---

**Questions?** Check README.md for detailed documentation
