// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('plantpk_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        type: userType,
        token: 'mock-jwt-token'
      };
      
      setUser(mockUser);
      localStorage.setItem('plantpk_user', JSON.stringify(mockUser));
      toast.success(`Welcome back, ${mockUser.name}!`);
      return mockUser;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
        }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        token: 'mock-jwt-token'
      };
      
      setUser(newUser);
      localStorage.setItem('plantpk_user', JSON.stringify(newUser));
      toast.success(`Welcome to Plant.pk, ${newUser.name}!`);
      return newUser;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('plantpk_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('plantpk_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return updatedUser;
    } catch (error) {
      toast.error('Update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
