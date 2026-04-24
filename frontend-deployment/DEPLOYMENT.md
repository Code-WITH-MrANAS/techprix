# Frontend Deployment to Vercel

## Configuration
- **Backend API**: https://techprix-uun4.vercel.app/api
- **Frontend Build**: Vite (optimized for production)
- **Environment**: .env.production

## Setup for Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy: Setup frontend-deployment for Vercel"
git push
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select this repository
4. **Framework**: React
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Root Directory**: `./frontend-deployment` (or select from dropdown)
8. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://techprix-uun4.vercel.app/api`
9. Click "Deploy"

### 3. Environment Variables
The following are already configured:
- `VITE_API_URL=https://techprix-uun4.vercel.app/api` (in .env.production)

## Available API Endpoints

All requests are routed to: `https://techprix-uun4.vercel.app/api`

- **POST /contact** - Submit contact form
- **GET /projects** - Fetch all projects  
- **GET /reviews** - Fetch reviews/testimonials
- **GET /health** - Health check

## Local Development

```bash
npm install
npm run dev
# Frontend at http://localhost:5173
# Backend proxy to https://techprix-uun4.vercel.app/api
```

## Production Build

```bash
npm run build
npm run preview
```

The `dist/` folder contains the built frontend ready for deployment.

## Troubleshooting

If API calls fail:
1. Check that `VITE_API_URL` is set correctly in Vercel Environment Variables
2. Verify backend API is responding at https://techprix-uun4.vercel.app/api/health
3. Check browser console for CORS or network errors
4. Ensure MongoDB is connected on the backend

## Features

- ✅ Contact form with email notifications
- ✅ Projects portfolio display
- ✅ Testimonials/Reviews section
- ✅ Responsive design (Tailwind CSS)
- ✅ 3D effects (React Three Fiber)
- ✅ Theme switching
- ✅ WhatsApp integration button
