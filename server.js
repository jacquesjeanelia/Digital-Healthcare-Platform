const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
=======
const authRoutes = require('./routes/auth');
>>>>>>> parent of c85381e (reverts and fixes)
const path = require('path');
const morgan = require('morgan');
const Redis = require('ioredis');
const authRoutes = require('./routes/auth');
const complaintsRoutes = require('./routes/complaints');

// Load environment variables
dotenv.config();

// Configure MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vercel-admin-user-681146823a0e515dbc263eeb:i2PVzN8J8zgaxkM9@sehaty.nr1hkua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Configure Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

// Debug logging
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', MONGODB_URI ? 'Present' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('Redis connection:', redis.status);

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintsRoutes);

// Generic 404 handler for undefined API endpoints
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found', path: req.originalUrl });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const dbPing = await mongoose.connection.db.admin().ping().catch(() => false);
    
    res.status(dbStatus === 1 && dbPing ? 200 : 503).json({
      status: dbStatus === 1 && dbPing ? 'healthy' : 'unhealthy',
      database: {
        connection: dbStatus === 1 ? 'connected' : 'disconnected',
        ping: dbPing ? 'successful' : 'failed'
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Static file serving in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'sehaty-frontend/dist');
  app.use(express.static(frontendPath));
  
  // Client-side routing
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }
    
    if (req.path.startsWith('/assets/')) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// MongoDB connection with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Using connection string:', MONGODB_URI);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    });

    console.log('Successfully connected to MongoDB');
    await conn.db.admin().ping();
    console.log('MongoDB connection ping successful');
    
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    if (retries > 0) {
      console.log(`Retrying connection in ${delay}ms... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error('Failed to connect to MongoDB after all retries');
      process.exit(1);
    }
  }
};

// Initialize database connection
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }
  
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server only in local development (not on Vercel)
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;