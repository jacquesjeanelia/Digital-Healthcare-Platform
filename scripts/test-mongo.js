require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'Not defined');
    console.log('JWT Secret:', process.env.JWT_SECRET ? 'Defined' : 'Not defined');
    
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined in .env.local');
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    
    // Get list of collections
    const collections = Object.keys(mongoose.connection.collections);
    console.log('Collections:', collections);
    
    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection(); 