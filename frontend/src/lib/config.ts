/// <reference types="vite/client" />

// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'https://sehaty-backend-sand.vercel.app';
// Remove trailing slash if present and ensure no double slashes
export const API_URL = BASE_URL.replace(/\/+$/, '');

// Log the API URL for debugging
console.log('API URL:', API_URL);

// Other configuration constants can be added here 