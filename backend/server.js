import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import testRoutes from './src/routes/test.routes.js';
import clientPromise from './src/config/mongodb.js';

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
  origin: ['https://sehaty-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  // Skip logging favicon requests
  if (req.url === '/favicon.ico') {
    return next();
  }
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Favicon handler
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sehaty API',
    status: 'ok',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    let dbStatus = 'disconnected';
    
    try {
      const client = await clientPromise;
      dbStatus = client.isConnected() ? 'connected' : 'disconnected';
    } catch (error) {
      console.error('MongoDB connection error:', error);
      dbStatus = 'error';
    }

    const status = {
      status: dbStatus === 'connected' ? 'ok' : 'error',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    console.log('Health check:', status);
    res.json(status);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

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

// Export the Express app for serverless
export default app;

// Only start the server if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
  });
} 