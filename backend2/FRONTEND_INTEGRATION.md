# Integration Guide - Frontend to Backend2

This guide shows how to integrate the Backend2 email service with your frontend-deployment.

## Step 1: Update API Service

Edit your frontend API service file:

### File: `frontend-deployment/src/services/api.js`

```javascript
import axios from 'axios';

// Backend2 Email Service URL
const BACKEND2_URL = 
  process.env.REACT_APP_BACKEND2_URL || 
  'http://localhost:5000';

// Create API instances
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 10000,
});

const emailApi = axios.create({
  baseURL: BACKEND2_URL,
  timeout: 10000,
});

/**
 * Send contact form email via Backend2
 */
export const sendContactEmail = async (formData) => {
  try {
    const response = await emailApi.post('/api/send-email', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      service: formData.service || '',
      message: formData.message,
    });
    return response.data;
  } catch (error) {
    console.error('Email send error:', error.response?.data || error.message);
    throw error.response?.data || { 
      success: false, 
      message: error.message 
    };
  }
};

// ... rest of your API functions
export default api;
```

## Step 2: Update Contact Form Component

Edit your contact form component to use the new email service:

### File: `frontend-deployment/src/components/ContactSection.jsx`

```javascript
import { useState } from 'react';
import { sendContactEmail } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Call Backend2 email service
      const response = await sendContactEmail(formData);

      if (response.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        
        // Show success message for 5 seconds
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark to-darker">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Get in Touch
        </h2>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200">
            ✅ Thank you! Your message has been sent successfully.
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
            ❌ Error sending message. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="">Select a Service (Optional)</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white font-semibold rounded transition-all duration-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
```

## Step 3: Configure Environment Variables

### File: `frontend-deployment/.env.local`

```env
# Backend2 Email Service URL
REACT_APP_BACKEND2_URL=http://localhost:5000
# For production:
# REACT_APP_BACKEND2_URL=https://backend2-*.vercel.app
```

## Step 4: Update vite.config.js

Ensure your Vite config exposes environment variables:

### File: `frontend-deployment/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'process.env': {}
  }
})
```

## Step 5: Start Both Services

### Terminal 1 - Start Backend2
```bash
cd backend2
npm install
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2 - Start Frontend
```bash
cd frontend-deployment
npm install
npm run dev
# Runs on http://localhost:5173
```

## Step 6: Test the Integration

1. Open `http://localhost:5173` in your browser
2. Navigate to the contact section
3. Fill out the contact form
4. Click "Send Message"
5. Check your email for:
   - Admin notification at `EMAIL_RECEIVER`
   - Confirmation email at the form's email address

## Production Deployment

### Deploy Backend2 to Vercel

```bash
cd backend2
vercel --prod
```

Add environment variables in Vercel dashboard and get your URL.

### Deploy Frontend to Vercel

```bash
cd frontend-deployment
vercel --prod
```

### Update Frontend Environment Variables

After deploying Backend2, set `REACT_APP_BACKEND2_URL` in frontend environment variables:

```
REACT_APP_BACKEND2_URL=https://backend2-*.vercel.app
```

## Troubleshooting

### Issue: CORS Error
**Solution:** Add your frontend URL to `CLIENT_URL` in Backend2 `.env`:
```env
CLIENT_URL=http://localhost:5173,https://your-frontend-url.vercel.app
```

### Issue: Emails not sending
**Solution:** Verify Gmail configuration:
- 2-Step Verification enabled
- App-specific password generated and added to `.env`

### Issue: "Cannot find module"
**Solution:** Install dependencies:
```bash
cd backend2
npm install
```

## API Response Examples

### Success
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

### Error
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

## Next Steps

- Customize email templates in `backend2/utils/emailService.js`
- Add additional form fields as needed
- Set up email notifications for your team
- Configure domain email if desired

For more information, see [backend2/README.md](../backend2/README.md)
