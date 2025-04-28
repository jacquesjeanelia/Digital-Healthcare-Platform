const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');

// Load environment variables
dotenv.config();

// Debug logging
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'sehaty-frontend/dist')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

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
      console.log(`Attempting to connect to MongoDB (Attempt ${i + 1}/${retries})...`);
      
      await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
      
      console.log('✅ Successfully connected to MongoDB');
      
      // Test database connection
      await mongoose.connection.db.admin().ping();
      console.log('✅ Database ping successful');
      
      // Set up connection event handlers
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
        setTimeout(() => connectDB(retries, delay), delay);
      });
      
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${i + 1} failed:`, {
        name: err.name,
        message: err.message,
        code: err.code
      });
      
      if (i === retries - 1) {
        console.error('❌ All MongoDB connection attempts failed');
        process.exit(1);
      }
      
      console.log(`Waiting ${delay/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Initialize database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'sehaty-frontend/dist/index.html'));
});

// Health check endpoint with detailed status
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const dbPing = await mongoose.connection.db.admin().ping().catch(() => false);
    
    const status = {
      status: dbStatus === 1 && dbPing ? 'healthy' : 'unhealthy',
      database: {
        connection: dbStatus === 1 ? 'connected' : 'disconnected',
        ping: dbPing ? 'successful' : 'failed',
        state: mongoose.STATES[dbStatus]
      },
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
    
    console.log('Health check:', status);
    res.status(dbStatus === 1 && dbPing ? 200 : 503).json(status);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
    path: req.path,
    method: req.method
  });
  
  // Handle specific error types
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
}); 