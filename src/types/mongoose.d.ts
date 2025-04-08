/**
 * Custom type definitions for Mongoose to address TypeScript errors
 */

import { Schema, Model, Document } from 'mongoose';

declare module 'mongoose' {
  // Ensure that we can use String type in Schema definitions
  interface SchemaDefinitionProperty<T> {
    type?: T extends string ? StringConstructor | typeof String : any;
    ref?: string;
    required?: boolean;
    default?: any;
    enum?: any[];
  }
}

// Extend the Schema types to better handle ObjectId references
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: any;
    }
  }
} 