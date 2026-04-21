const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // Avoid reconnecting if already connected (important for serverless)
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    return; // Don't crash — let the app respond with 500 on DB operations
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas → Network Access');
    process.exit(1);
    // Do NOT process.exit(1) — this kills Vercel serverless functions!
  }
};

module.exports = connectDB;