import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/utils/mongodb';
import { UserModel } from '@/models/UserModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connection established');

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Validate input
    if (!email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Find user by email
    console.log('Finding user with email:', email);
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    console.log('User found:', user._id.toString());

    // Compare password
    console.log('Comparing passwords...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', user._id.toString());
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    console.log('Password verified for user:', user._id.toString());

    // Create JWT token
    console.log('Creating JWT token...');
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role
      },
      String(process.env.JWT_SECRET),
      { expiresIn: '24h' }
    );
    
    console.log('JWT token created successfully');

    // Return user data and token
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle different types of errors
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return res.status(500).json({ 
        message: 'Database connection error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({ 
        message: 'Token generation error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    return res.status(500).json({ 
      message: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 