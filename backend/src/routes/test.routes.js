import express from 'express';
import clientPromise from '../config/mongodb.js';

const router = express.Router();

// @desc    Test MongoDB connection
// @route   GET /api/test
// @access  Public
router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Get list of collections
    const collections = await db.listCollections().toArray();
    
    res.status(200).json({
      message: 'MongoDB connection successful',
      database: db.databaseName,
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({
      message: 'MongoDB connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router; 