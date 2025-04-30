export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    profile: '/users/profile',
  },
};
