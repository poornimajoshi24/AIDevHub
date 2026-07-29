// Mock Authentication API Service

export const authAPI = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate network latency
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    const user = {
      id: 'usr_9921',
      name: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Alex Developer',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Senior Staff Engineer',
      githubUsername: 'alexdev',
      joinedDate: 'Jan 2024',
      tier: 'Pro AI Architect'
    };
    localStorage.setItem('aidevhub_user', JSON.stringify(user));
    return user;
  },

  signup: async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    const user = {
      id: `usr_${Math.floor(Math.random() * 9000) + 1000}`,
      name: name || 'New Engineer',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      role: 'Full Stack Engineer',
      githubUsername: email.split('@')[0],
      joinedDate: 'Just now',
      tier: 'Pro AI Architect'
    };
    localStorage.setItem('aidevhub_user', JSON.stringify(user));
    return user;
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('aidevhub_user');
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('aidevhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      id: 'usr_demo',
      name: 'Alex Rivera',
      email: 'alex.rivera@meta.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Senior AI Systems Engineer',
      githubUsername: 'alexrivera-dev',
      joinedDate: 'Feb 2024',
      tier: 'Pro AI Architect'
    };
  }
};
