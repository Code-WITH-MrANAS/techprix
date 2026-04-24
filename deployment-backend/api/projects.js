import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../../config/db';
import Project from '../../models/Project';

dotenv.config();

const getCorsMiddleware = () => {
  const defaultOrigins = [
    'https://www.techprix.online',
    'https://techprix.online',
    'http://localhost:5173',
  ];
  const envOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
    : [];
  const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
};

const corsMiddleware = getCorsMiddleware();

export default async function handler(req, res) {
  // Enable CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { featured } = req.query;
    const filter = { active: true };
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(featured === 'true' ? 6 : 100);

    return res.status(200).json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects.',
    });
  }
}
