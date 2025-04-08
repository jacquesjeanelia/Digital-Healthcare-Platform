import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ 
        success: false, 
        message: 'MONGODB_URI is not defined in environment variables' 
      });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ 
        success: false, 
        message: 'JWT_SECRET is not defined in environment variables' 
      });
    }

    // Try to connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string (first 20 chars):', process.env.MONGODB_URI.substring(0, 20) + '...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    // Get list of collections
    const collections = Object.keys(mongoose.connection.collections);
    console.log('Collections:', collections);
    
    // Disconnect
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    
    return res.status(200).json({ 
      success: true, 
      message: 'MongoDB connection successful',
      collections,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasJwtSecret: !!process.env.JWT_SECRET
      }
    });
  } catch (error: any) {
    console.error('MongoDB test error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to MongoDB', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 