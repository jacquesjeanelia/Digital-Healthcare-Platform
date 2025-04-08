// This file is used to fix issues with the Vercel build process
// It modifies TypeScript files to fix compatibility issues

const fs = require('fs');
const path = require('path');

/**
 * Fix helper function for updating files
 * @param {string} filePath - Path to the file
 * @param {Array<{regex: RegExp, replacement: string}>} fixes - Array of regex replacements
 * @param {string} description - Description of what's being fixed
 */
function fixFile(filePath, fixes, description) {
  try {
    console.log(`🔧 Fixing ${description}...`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      return;
    }
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply all fixes
    fixes.forEach(fix => {
      const originalContent = content;
      content = content.replace(fix.regex, fix.replacement);
      if (content !== originalContent) {
        modified = true;
      }
    });
    
    if (!modified) {
      console.log(`⚠️ No changes needed for ${description}`);
      return;
    }
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Successfully updated ${description}`);
  } catch (error) {
    console.error(`❌ Error updating ${description}:`, error);
  }
}

// Fix all TypeScript errors and compatibility issues
const fixes = [
  {
    filePath: path.join(__dirname, '../models/MedicalRecordModel.ts'),
    description: 'MedicalRecordModel.ts ObjectId type issues',
    fixes: [
      {
        regex: /import mongoose, { Schema, Document, Types } from 'mongoose';/g,
        replacement: 'import mongoose, { Schema, Document } from \'mongoose\';'
      },
      {
        regex: /type: Types\.ObjectId/g,
        replacement: 'type: String'
      }
    ]
  },
  {
    filePath: path.join(__dirname, '../pages/api/auth/login.ts'),
    description: 'login.ts password type issues',
    fixes: [
      {
        regex: /const isValidPassword = await bcrypt\.compare\(password, user\.password\);/g,
        replacement: 'const isValidPassword = await bcrypt.compare(password as string, user.password as string);'
      }
    ]
  },
  // Add more fixes here as needed
];

// Apply all fixes
console.log('🛠️ Starting Vercel build fixes...');
fixes.forEach(fix => {
  fixFile(fix.filePath, fix.fixes, fix.description);
});
console.log('🎉 Finished applying build fixes'); 