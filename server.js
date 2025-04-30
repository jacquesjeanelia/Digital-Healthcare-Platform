const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

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
  origin: '*', // In production, replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB');
    
    // Test database connection
    await mongoose.connection.db.admin().ping();
    console.log('✅ Database ping successful');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const status = {
    status: 'ok',
    database: dbStatus === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  };
  console.log('Health check:', status);
  res.json(status);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    name: err.name
  });
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
}); 