import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { 
  setAuthToken, 
  setRefreshToken, 
  getStoredUser, 
  setStoredUser, 
  clearAuthData 
} from '../api/axios';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = getStoredUser();
      const token = localStorage.getItem('accessToken');
      
      if (storedUser && token) {
        try {
          // Verify token by fetching current user
          const response = await api.get('/auth/me');
          const userData = response.data.data.user;
          setUser(userData);
          setStoredUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear everything
          clearAuthData();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Register
  const register = useCallback(async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user: newUser, token } = response.data.data;
      
      setAuthToken(token);
      setStoredUser(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      
      toast.success('Account created successfully! Welcome to HYB! 🎉');
      return { success: true, user: newUser };
    } catch (error) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: loggedInUser, accessToken, refreshToken } = response.data.data;
      
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      setStoredUser(loggedInUser);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      
      toast.success(`Welcome back, ${loggedInUser.fullName}! 👋`);
      return { success: true, user: loggedInUser };
    } catch (error) {
      const message = error.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      const formData = new FormData();
      
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });
      
      const response = await api.put('/auth/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      setStoredUser(updatedUser);
      
      toast.success('Profile updated successfully! ✨');
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      
      const { token } = response.data.data;
      setAuthToken(token);
      
      toast.success('Password changed successfully! 🔒');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to change password';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data.data.user;
      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      return null;
    }
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
