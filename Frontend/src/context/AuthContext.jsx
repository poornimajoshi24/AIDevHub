import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = authAPI.getCurrentUser();
    setUser(activeUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const loggedUser = await authAPI.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const signup = async (name, email, password) => {
    const newUser = await authAPI.signup(name, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
