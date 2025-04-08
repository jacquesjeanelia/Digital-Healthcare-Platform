import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import { UserModel } from '@/models/UserModel';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Test-DB API: Starting database connection test');
    
    // Log MongoDB URI (partial, for security)
    const mongoUri = process.env.MONGODB_URI || '';
    const maskedUri = mongoUri 
      ? mongoUri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@(.+)/, '$1$2:****@$4')
      : 'Not defined';
    console.log('Test-DB API: Using MongoDB connection', maskedUri);
    
    // Check if mongoose is already connected
    const isConnected = mongoose.connection.readyState === 1;
    console.log('Test-DB API: Current mongoose connection state:', 
      isConnected ? 'Connected' : 'Not connected');
    
    // Test database connection
    console.log('Test-DB API: Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Test-DB API: MongoDB connection successful');
    
    // Get information about the current connection
    const connState = {
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      // Safe access to client information
      clientConnected: mongoose.connection.readyState === 1
    };
    
    // Get list of collections to verify if our models exist
    console.log('Test-DB API: Getting collections and models');
    const collections = Object.keys(mongoose.connection.collections);
    const models = mongoose.modelNames();
    
    // Count users
    console.log('Test-DB API: Counting users');
    let userCount = 0;
    let countError = null;
    try {
      userCount = await UserModel.countDocuments();
      console.log('Test-DB API: Found', userCount, 'users in database');
    } catch (error: any) {
      console.error('Test-DB API: Error counting users:', error);
      countError = {
        message: error.message,
        name: error.name,
      };
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'MongoDB connection test completed',
      connectionState: connState,
      collections,
      models,
      userCount,
      countError,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        // Don't include sensitive info like actual connection string
        hasMongoUri: !!process.env.MONGODB_URI,
        mongoUriMasked: maskedUri,
        hasJwtSecret: !!process.env.JWT_SECRET
      }
    });
  } catch (error: any) {
    console.error('Test-DB API: Connection error:', error);
    
    // Determine MongoDB-specific errors
    let errorDetails = {
      name: error.name,
      message: error.message,
      code: error.code,
    };
    
    // Specific error types
    let errorType = 'unknown';
    if (error.name === 'MongooseError') {
      errorType = 'mongoose';
    } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      errorType = 'mongodb';
    } else if (error.message && error.message.includes('ENOTFOUND')) {
      errorType = 'dns';
    } else if (error.message && error.message.includes('ECONNREFUSED')) {
      errorType = 'connection';
    } else if (error.message && error.message.includes('authentication')) {
      errorType = 'auth';
    }
    
    // For connection string errors
    const mongoUri = process.env.MONGODB_URI || '';
    const uriStructure = mongoUri
      ? {
          hasProtocol: mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://'),
          includesCredentials: mongoUri.includes('@'),
          includesHost: mongoUri.includes('.mongodb.net') || mongoUri.includes('localhost'),
        }
      : { missing: true };
      
    return res.status(500).json({ 
      success: false, 
      message: 'MongoDB connection test failed', 
      error: errorDetails,
      errorType,
      mongoUriStructure: uriStructure,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 