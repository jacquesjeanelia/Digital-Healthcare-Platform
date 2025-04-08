// This file is used to fix issues with the Vercel build process
// It modifies the MedicalRecordModel.ts file to use String instead of Types.ObjectId

const fs = require('fs');
const path = require('path');

const medicalRecordModelPath = path.join(__dirname, '../models/MedicalRecordModel.ts');

try {
  console.log('🔧 Fixing MedicalRecordModel.ts for Vercel deployment...');
  
  // Read the file
  let content = fs.readFileSync(medicalRecordModelPath, 'utf8');
  
  // Update the import statement
  content = content.replace(
    /import mongoose, { Schema, Document, Types } from 'mongoose';/g,
    'import mongoose, { Schema, Document } from \'mongoose\';'
  );
  
  // Replace ObjectId types with String
  content = content.replace(
    /type: Types\.ObjectId/g,
    'type: String'
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(medicalRecordModelPath, content, 'utf8');
  
  console.log('✅ Successfully updated MedicalRecordModel.ts');
} catch (error) {
  console.error('❌ Error updating MedicalRecordModel.ts:', error);
} 