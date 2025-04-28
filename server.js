const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Debug logging
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// Create Express app
const app = express();

// Request logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes - Mount API routes before static files
app.use('/api/auth', authRoutes);

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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'sehaty-frontend/dist');
  
  // Serve static files
  app.use(express.static(frontendPath));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }
    
    // Skip static assets
    if (req.path.startsWith('/assets/')) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    // Serve index.html for all other routes
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// MongoDB connection configuration
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
};

// MongoDB connection with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
      console.log('✅ Successfully connected to MongoDB');
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('❌ All MongoDB connection attempts failed');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
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