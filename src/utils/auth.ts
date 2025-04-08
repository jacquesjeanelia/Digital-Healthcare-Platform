import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = (
  req: NextApiRequest, 
  res: NextApiResponse
): Promise<DecodedToken | null> => {
  return new Promise((resolve) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth: Missing or invalid Authorization header');
      res.status(401).json({ message: 'Unauthorized - Missing or invalid token format' });
      return resolve(null);
    }

    const token = authHeader.split(' ')[1];
    
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('Auth: JWT_SECRET environment variable is not defined');
      res.status(500).json({ message: 'Server configuration error - Missing JWT secret' });
      return resolve(null);
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
      resolve(decoded);
    } catch (error: any) {
      console.error('Auth: JWT verification error', { 
        error: error.message,
        name: error.name
      });
      
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Invalid token - ' + error.message });
      } else if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Expired token' });
      } else {
        res.status(500).json({ message: 'Token verification error' });
      }
      
      resolve(null);
    }
  });
}; 