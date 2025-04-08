import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    return res.status(200).json({ message: 'Successfully connected to MongoDB' });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
  }
} 