/// <reference types="vite/client" />

// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'https://sehaty-backend.onrender.com';
export const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

// Log the API URL for debugging
console.log('API URL:', API_URL);

// Other configuration constants can be added here 