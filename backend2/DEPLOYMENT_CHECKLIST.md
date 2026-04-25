# Deployment Checklist - Backend2

Use this checklist to ensure successful deployment of Backend2 to Vercel.

## Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] `.env` file configured with all required variables
- [ ] Gmail App Password generated and verified
- [ ] Gmail 2-Step Verification is enabled
- [ ] Local testing successful (`npm run dev`)
- [ ] All API endpoints tested:
  - [ ] `GET /api/health` returns 200
  - [ ] `POST /api/send-email` sends test email
- [ ] Email templates verified in `utils/emailService.js`
- [ ] CORS configuration updated with frontend URL
- [ ] `vercel.json` configuration reviewed

## Required Environment Variables

Create these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `EMAIL_USER` | Gmail address | `your-email@gmail.com` |
| `EMAIL_APP_PASSWORD` | App-specific password | `xxxx-xxxx-xxxx-xxxx` |
| `EMAIL_RECEIVER` | Admin email address | `your-email@gmail.com` |
| `CLIENT_URL` | Frontend URLs | `https://your-domain.com,https://your-domain.vercel.app` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` |

## Deployment Steps

### Using Vercel CLI

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Deploy: `vercel --prod`
- [ ] Confirm production deployment: `yes`
- [ ] Add environment variables when prompted
- [ ] Wait for deployment to complete
- [ ] Verify deployment URL in console output

### Using Vercel Dashboard

- [ ] Push to GitHub:
  ```bash
  git add .
  git commit -m "Backend2 email service"
  git push origin main
  ```
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Select GitHub repository
- [ ] Configure project:
  - [ ] Root directory: `backend2`
  - [ ] Framework: "Other"
  - [ ] Build Command: leave empty
- [ ] Add environment variables
- [ ] Click "Deploy"
- [ ] Wait for deployment

## Post-Deployment Verification

- [ ] Deployment successful (green checkmark)
- [ ] Get production URL: `https://backend2-*.vercel.app`
- [ ] Test health endpoint:
  ```bash
  curl https://backend2-*.vercel.app/api/health
  ```
- [ ] Should receive: `"status": "healthy"`
- [ ] Test email endpoint with sample data:
  ```bash
  curl -X POST https://backend2-*.vercel.app/api/send-email \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test",
      "email": "test@example.com",
      "service": "Testing",
      "message": "Production test message"
    }'
  ```
- [ ] Check for emails:
  - [ ] Admin received contact notification
  - [ ] Client received confirmation email
- [ ] Verify no errors in Vercel logs:
  - [ ] Go to Vercel Dashboard
  - [ ] Click on your project
  - [ ] Check "Logs" tab

## Frontend Integration

- [ ] Update frontend `.env.local`:
  ```env
  REACT_APP_BACKEND2_URL=https://backend2-*.vercel.app
  ```
- [ ] Test frontend contact form
- [ ] Verify emails are received
- [ ] Check browser console for errors
- [ ] Test on mobile device (if applicable)

## Documentation Updates

- [ ] Update README with production URLs
- [ ] Add Backend2 URL to frontend documentation
- [ ] Document email credentials securely
- [ ] Update CORS allowed origins if needed

## Monitoring & Maintenance

- [ ] Set up email notifications for deployment errors
- [ ] Check Vercel logs regularly:
  - [ ] Visit Vercel Dashboard daily
  - [ ] Monitor for error spikes
- [ ] Test email sending weekly
- [ ] Keep dependencies updated:
  ```bash
  npm outdated
  npm update
  ```
- [ ] Review email delivery rates monthly
- [ ] Backup `.env` variables securely

## Rollback Plan

If deployment fails:

- [ ] Check Vercel logs for errors
- [ ] Verify all environment variables are set
- [ ] Test locally: `npm run dev`
- [ ] Check email configuration
- [ ] Rollback to previous deployment:
  - [ ] Go to Vercel Dashboard
  - [ ] Click Deployments
  - [ ] Select previous version
  - [ ] Click "Promote to Production"

## Common Issues & Solutions

### Issue: 502 Bad Gateway
- [ ] Check Vercel logs
- [ ] Verify environment variables
- [ ] Test locally first

### Issue: Emails not sending
- [ ] Verify Gmail credentials
- [ ] Check app-specific password
- [ ] Review spam folder
- [ ] Check email rate limits

### Issue: CORS error from frontend
- [ ] Add frontend URL to `CLIENT_URL`
- [ ] Redeploy Backend2
- [ ] Clear frontend cache
- [ ] Test in private browser window

### Issue: Validation errors
- [ ] Check request body format
- [ ] Verify all required fields
- [ ] Review validation rules in `middleware/validate.js`

## Success Indicators

✅ Deployment checklist complete when:
- Vercel deployment shows green checkmark
- Health endpoint returns 200
- Test emails received successfully
- Frontend integration working
- No console errors
- All environment variables set
- Logs show normal operation

## Support

For deployment issues:
1. Check Vercel logs: Vercel Dashboard → Deployments → Logs
2. Review `.env` variables
3. Test locally: `npm run dev`
4. Check email configuration
5. Contact support if needed

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Production URL:** https://backend2-*.vercel.app
**Notes:** _______________
