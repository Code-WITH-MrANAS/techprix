const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // Avoid reconnecting if already connected (important for serverless)
  if (isConnected || mongoose.connection.readyState >= 1) {
    console.log('📊 Using existing MongoDB connection');
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
      retryWrites: true,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas → Network Access');
    throw error;
  }
};

module.exports = connectDB;
