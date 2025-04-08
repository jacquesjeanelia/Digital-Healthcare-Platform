import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/utils/mongodb';
import { UserModel } from '@/models/UserModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Profile API: Missing or invalid Authorization header', { authHeader });
      return res.status(401).json({ message: 'Unauthorized - Missing or invalid token format' });
    }

    const token = authHeader.split(' ')[1];
    
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('Profile API: JWT_SECRET environment variable is not defined');
      return res.status(500).json({ message: 'Server configuration error - Missing JWT secret' });
    }

    // Verify token
    try {
      // Log token without exposing full value
      console.log('Profile API: Verifying token', { tokenPrefix: token.substring(0, 10) + '...' });
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
      console.log('Profile API: Token verified successfully', { userId: decoded.userId });
      
      // Connect to database
      console.log('Profile API: Connecting to MongoDB');
      await connectDB();
      console.log('Profile API: MongoDB connection established');

      // Find user by ID
      console.log('Profile API: Finding user by ID', { userId: decoded.userId });
      const user = await UserModel.findById(decoded.userId).select('-password');
      
      if (!user) {
        console.log('Profile API: User not found', { userId: decoded.userId });
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Profile API: User found', { 
        userId: user._id.toString(),
        role: user.role
      });
      
      // Return user data
      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (jwtError: any) {
      console.error('Profile API: JWT verification error', { 
        error: jwtError.message,
        name: jwtError.name,
        stack: jwtError.stack
      });
      
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token - ' + jwtError.message });
      }
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Expired token' });
      }
      
      throw jwtError; // Let the outer catch handle other errors
    }
  } catch (error: any) {
    console.error('Profile API: Unexpected error', { 
      error: error.message,
      name: error.name,
      stack: error.stack
    });
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error - ' + error.message });
    }
    
    return res.status(500).json({ message: 'Internal server error - ' + error.message });
  }
} 