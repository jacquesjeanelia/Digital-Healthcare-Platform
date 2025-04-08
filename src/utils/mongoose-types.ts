/**
 * Utility types and helpers for Mongoose schemas
 * This helps maintain consistent typing across the application
 */
import mongoose from 'mongoose';

// Type for document IDs - using string for better Vercel compatibility
export type DocumentId = string;

// TypeScript helper for model references
export type Ref<T> = string | T;

// Use this instead of Types.ObjectId in schema definitions
export const ObjectIdType = String;

// Helper functions for working with ObjectIds
export const isValidObjectId = (id: any): boolean => mongoose.isValidObjectId(id);

export const toObjectId = (id: string): mongoose.Types.ObjectId => new mongoose.Types.ObjectId(id);

// Type helper for schema definitions to ensure consistency
export interface SchemaOptions {
  timestamps?: boolean;
  collection?: string;
  versionKey?: string | false;
  autoIndex?: boolean;
}

// Default schema options
export const defaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  autoIndex: true,
}; 