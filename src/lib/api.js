import axios from 'axios';

// Resolve API base URL with sensible fallbacks
// Resolve API base URL with sensible fallbacks
const resolveApiBase = () => {
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envBase) return envBase.replace(/\/+$/, '');

  if (typeof window === 'undefined') return 'http://localhost:3000/api';

  return '/api';
};

const API_BASE_URL = resolveApiBase();
const API_ROOT = API_BASE_URL.replace(/\/api$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Increased timeout to 10 seconds
});

// Normalize Axios errors to { error: string }
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Network error. Please try again.';

    if (error?.response?.data) {
      // Handle different error response formats
      if (typeof error.response.data === 'string') {
        message = error.response.data;
      } else if (error.response.data.error) {
        message = error.response.data.error;
      } else if (error.response.data.message) {
        message = error.response.data.message;
      }
    } else if (error?.message) {
      message = error.message;
    }

    return Promise.reject({ error: message });
  }
);

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Ensure we always throw an object with error property
      if (error && typeof error === 'object' && error.error) {
        throw error;
      }
      throw { error: 'Registration failed. Please try again.' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Ensure we always throw an object with error property
      if (error && typeof error === 'object' && error.error) {
        throw error;
      }
      throw { error: 'Login failed. Please try again.' };
    }
  },

  // Get all users (for admin purposes)
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      // Ensure we always throw an object with error property
      if (error && typeof error === 'object' && error.error) {
        throw error;
      }
      throw { error: 'Failed to fetch users. Please try again.' };
    }
  },
};

export const orderAPI = {
  checkout: async (payload) => {
    try {
      const response = await api.post('/checkout', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrders: async (email) => {
    try {
      const response = await api.get(`/orders?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { orders: [] };
    }
  },
};

export const healthAPI = {
  check: async () => {
    // Hit the backend root /health (not under /api)
    const response = await axios.get(`${API_ROOT}/health`, {
      timeout: 5000,
    });
    return response.data;
  },
};

export default api;
