import bcrypt from 'bcryptjs';
import clientPromise from '../config/mongodb.js';

const COLLECTION_NAME = 'users';

export async function createUser(userData) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await collection.insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);
  return collection.findOne({ email });
}

export async function findUserById(id) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);
  return collection.findOne({ _id: id });
}

export async function matchPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
} 