# Database Removal & File Storage Migration

## Overview

The deployment-backend has been updated to **remove all database dependencies** and now uses **file-based storage** with **email notifications** for contacts and reviews.

### What Changed?

✅ **Removed:**
- MongoDB/Mongoose dependencies
- Database connection logic
- Mongoose schema models (Contact, Review, Project)

✅ **Kept:**
- ✉️ Email service (nodemailer) - still sends notifications
- 📝 Data persistence (text files)
- 🔍 Full validation
- 🔌 All API endpoints

## File Storage System

### Location
All data is stored in `/deployment-backend/data/` directory as JSON files:
- `contacts.txt` - All contact form submissions
- `reviews.txt` - All review submissions

### Data Files Format
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "...": "other fields"
  }
]
```

## API Endpoints (Unchanged)

### Contacts
```
POST   /api/contact              - Submit new contact
GET    /api/contact              - Get all contacts
GET    /api/contact/[id]         - Get specific contact
DELETE /api/contact/[id]         - Delete contact
```

### Reviews
```
POST   /api/reviews              - Submit new review
GET    /api/reviews              - Get all reviews
GET    /api/reviews/[id]         - Get specific review
```

### Projects
```
GET    /api/projects             - Get projects (returns empty)
GET    /api/projects/[id]        - Get project (returns 404)
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd deployment-backend
npm install
```

Note: `mongoose` has been removed from package.json

### 2. Environment Variables
Create `.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_RECEIVER=receiver@example.com
PORT=5000
NODE_ENV=production
```

### 3. Run Backend
```bash
# Development
npm run dev

# Production
npm start
```

## File Storage Utility

### Location
`/deployment-backend/utils/fileStorage.js`

### Available Functions

```javascript
// Save data to file
saveToFile(filename, data)
// Returns: { ...data, id, createdAt }

// Read all records from file
readFromFile(filename)
// Returns: Array of records

// Get specific record by ID
getById(filename, id)
// Returns: Record object or null

// Delete record by ID
deleteById(filename, id)
// Returns: boolean

// Clear entire file
clearFile(filename)
// No return value
```

### Usage Example
```javascript
const { saveToFile, readFromFile, getById } = require('../utils/fileStorage');

// Save contact
const contact = saveToFile('contacts.txt', {
  name: 'John',
  email: 'john@email.com',
  message: 'Hello'
});
// contact.id is auto-generated

// Read all
const allContacts = readFromFile('contacts.txt');

// Get specific
const oneContact = getById('contacts.txt', '1234567890');
```

## Email Service

### Still Fully Functional
- ✅ Contact notifications sent to EMAIL_RECEIVER
- ✅ Client confirmation emails sent to submitter
- ✅ Beautiful HTML email templates
- ✅ Non-blocking (doesn't halt requests on email failure)

### Email Functions
Located in `/deployment-backend/utils/emailService.js`:

```javascript
sendContactNotification(contactData)
sendClientConfirmation(contactData)
sendReviewNotification(reviewData)  // Can be added if needed
```

## Data Backup & Management

### Accessing Stored Data
```bash
# View contacts
cat deployment-backend/data/contacts.txt

# View reviews
cat deployment-backend/data/reviews.txt
```

### Backup Data
```bash
# Create backup
cp -r deployment-backend/data deployment-backend/data.backup
```

### Clear All Data
```javascript
const fs = require('fs');

fs.writeFileSync('data/contacts.txt', '[]');
fs.writeFileSync('data/reviews.txt', '[]');
```

## Testing

### Test Contact Submission
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Review Submission
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "rating": 5,
    "review": "This is an excellent service!"
  }'
```

## Migration Notes

### Data Not Migrated
- Previous MongoDB data is NOT automatically imported
- You can manually migrate if needed by:
  1. Exporting MongoDB data
  2. Converting to JSON format
  3. Placing in `data/contacts.txt` or `data/reviews.txt`

### Removed Dependencies
- `mongoose@^9.4.1` - Removed from package.json
- Run `npm install` to update node_modules

### Models Folder
- `/deployment-backend/models/` - Now unused but kept for reference
- Can be safely deleted if needed

## Future Enhancements

### Potential Improvements
- [ ] Add data export to CSV
- [ ] Add data retention policy (auto-delete old records)
- [ ] Add simple admin dashboard
- [ ] Add file encryption for sensitive data
- [ ] Add database sync option for Firestore/Supabase

## Troubleshooting

### Data Not Saving?
```
✓ Check file permissions in /data directory
✓ Ensure /data folder exists
✓ Check console for errors
```

### Emails Not Sending?
```
✓ Verify EMAIL_USER and EMAIL_APP_PASSWORD in .env
✓ Check if Gmail 2FA is enabled (app password required)
✓ Verify EMAIL_RECEIVER is set
✓ Check nodemailer logs in console
```

### CORS Issues?
```
✓ CORS middleware is active in all endpoints
✓ Verify frontend VITE_API_URL environment variable
```

---

**Created:** January 2024
**Backend Version:** File Storage v1.0
**Status:** Production Ready ✅
