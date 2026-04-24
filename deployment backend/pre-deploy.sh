#!/bin/bash

# TechPrix Serverless Backend - Pre-Deployment Checklist
# Run this before deploying to Vercel

echo "🚀 TechPrix Backend - Pre-Deployment Checklist"
echo "================================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "  Node version: $(node -v)"
echo ""

# Check dependencies
echo "✓ Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
fi
echo "  Dependencies installed"
echo ""

# Check environment variables
echo "✓ Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo "⚠ .env.local not found"
    echo "  Copy from .env.example and update values:"
    echo "  cp .env.example .env.local"
else
    echo "  .env.local found"
fi
echo ""

# Required env vars
required_vars=("MONGODB_URI" "EMAIL_USER" "EMAIL_APP_PASSWORD" "EMAIL_RECEIVER" "CLIENT_URL")
missing_vars=()

if [ -f ".env.local" ]; then
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env.local; then
            missing_vars+=($var)
        fi
    done
fi

if [ ${#missing_vars[@]} -gt 0 ]; then
    echo "⚠ Missing environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    echo ""
fi

# Check vercel.json
echo "✓ Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
    echo "  vercel.json found"
else
    echo "✗ vercel.json not found"
    exit 1
fi
echo ""

# Summary
echo "================================================"
echo "✓ Pre-deployment checklist complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update .env.local with your credentials"
echo "  2. Run: npm run dev (to test locally)"
echo "  3. Deploy: vercel --prod"
echo ""
echo "🔗 Resources:"
echo "  - MongoDB Setup: https://mongodb.com/cloud/atlas"
echo "  - Gmail App Password: https://myaccount.google.com/apppasswords"
echo "  - Vercel Docs: https://vercel.com/docs"
echo ""
