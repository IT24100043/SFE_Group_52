import axios from 'axios';

// Base URL for the StudyWithMe backend. Set VITE_API_URL in .env
// (see .env.example). Falls back to local dev backend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Route prefixes as actually mounted in the backend's server.js:
//   app.use('/api/user', require('./routes/userRoutes'))
//   app.use('/api/todo', require('./routes/todoRoutes'))
// Kept here as single-source-of-truth constants in case the backend
// mount paths ever change.
export const USER_PREFIX = '/user';
export const TODO_PREFIX = '/todo';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalizes backend errors into a single friendly message string,
// while preserving the original error for callers that need it.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error.response?.data?.message;
    const friendlyMessage = backendMessage || 'Something went wrong. Please try again.';
    return Promise.reject({ ...error, friendlyMessage });
  }
);

export default api;
