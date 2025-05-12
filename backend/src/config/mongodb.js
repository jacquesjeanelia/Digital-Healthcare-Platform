import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Test the connection and database
clientPromise.then(async (client) => {
  try {
    const db = client.db('test');
    console.log('Successfully connected to test database');
    
    // Check if required collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    // Create collections if they don't exist
    const requiredCollections = ['Prescriptions', 'Notifications'];
    for (const collectionName of requiredCollections) {
      if (!collectionNames.includes(collectionName)) {
        console.log(`Creating ${collectionName} collection...`);
        await db.createCollection(collectionName);
        
        // Create indexes for Notifications collection
        if (collectionName === 'Notifications') {
          await db.collection('Notifications').createIndexes([
            { key: { userId: 1 } },
            { key: { createdAt: -1 } },
            { key: { read: 1 } }
          ]);
          console.log('Created indexes for Notifications collection');
        }
        
        console.log(`${collectionName} collection created`);
      } else {
        console.log(`${collectionName} collection already exists`);
      }
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 