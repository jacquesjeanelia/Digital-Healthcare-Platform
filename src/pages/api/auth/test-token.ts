import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ 
        valid: true, 
        decoded,
        message: 'Token is valid' 
      });
    } catch (error: any) {
      return res.status(401).json({ 
        valid: false, 
        error: error.message,
        message: 'Token is invalid or expired' 
      });
    }
  } catch (error: any) {
    console.error('Token test error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    });
  }
} 