"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Prevent multiple initialization attempts
    if (initialized) return;

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        // Check if the data looks like valid JSON before parsing
        const trimmedData = savedUser.trim();
        if (trimmedData.startsWith('{') && trimmedData.endsWith('}')) {
          const userData = JSON.parse(savedUser);
          // Validate that we have the required fields
          if (userData && typeof userData === 'object' && userData.username) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            console.warn('Invalid user data structure in localStorage, clearing...');
            localStorage.removeItem('user');
          }
        } else {
          console.warn('Invalid user data format in localStorage, clearing...');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        console.error('Corrupted data:', savedUser);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    setInitialized(true);
  }, [initialized]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
