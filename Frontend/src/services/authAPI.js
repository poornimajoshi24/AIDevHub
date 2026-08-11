import { apiRequest } from './apiClient.js';

const ROLE_LABELS = {
  developer: 'Developer',
  senior_engineer: 'Senior Engineer',
  staff_architect: 'Staff Architect',
  admin: 'Admin',
};

/**
 * Maps backend User document into the shape expected by UI components.
 */
export const formatUser = (user) => {
  if (!user) return null;

  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: ROLE_LABELS[user.role] || user.role,
    githubUsername: user.githubUsername || '',
    joinedDate: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '',
    tier: user.tier || 'Pro AI Architect',
  };
};

export const authAPI = {
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const response = await apiRequest('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    return formatUser(response.data?.user);
  },

  signup: async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required.');
    }

    const response = await apiRequest('/api/v1/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });

    return formatUser(response.data?.user);
  },

  logout: async () => {
    try {
      await apiRequest('/api/v1/auth/logout', { method: 'POST' });
    } catch {
      // Clear local session even if the cookie was already expired
    }
  },

  /**
   * Restores session from HttpOnly cookies via GET /me.
   * Returns null when unauthenticated.
   */
  getCurrentUser: async () => {
    try {
      const response = await apiRequest('/api/v1/auth/me');
      return formatUser(response.data?.user);
    } catch {
      return null;
    }
  },

  refreshToken: async () => {
    const response = await apiRequest('/api/v1/auth/refresh-token', {
      method: 'POST',
    });
    return response.data;
  },
};
