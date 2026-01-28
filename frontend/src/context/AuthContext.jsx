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

  // 🔐 Initialize auth on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        clearAuthData();
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        const userData = response.data.data.user;
        setUser(userData);
        setStoredUser(userData);
      } catch (error) {
        clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 📝 Register
  const register = useCallback(async (userData) => {
    try {
      const hasFile = userData.avatar instanceof File;
      let response;

      if (hasFile) {
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });
        response = await api.post('/auth/register', formData);
      } else {
        response = await api.post('/auth/register', userData);
      }

      const { user: newUser, accessToken, refreshToken } = response.data.data;

      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      setStoredUser(newUser);
      setUser(newUser);

      toast.success('Account created successfully! 🎉');
      return { success: true, user: newUser };
    } catch (error) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }

  }, []);

  // 🔑 Login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: loggedInUser, accessToken, refreshToken } = response.data.data;

      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      setStoredUser(loggedInUser);
      setUser(loggedInUser);

      toast.success(`Welcome back, ${loggedInUser.fullName}! 👋`);
      return { success: true, user: loggedInUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // 🚪 Logout
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (_) {
      // ignore API failure
    } finally {
      clearAuthData();
      setUser(null);
      toast.success('Logged out successfully');
    }
  }, []);

  // 👤 Update profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.put('/auth/update-profile', formData);
      const updatedUser = response.data.data.user;

      setUser(updatedUser);
      setStoredUser(updatedUser);
      toast.success('Profile updated successfully ✨');

      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // 🔄 Refresh user
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data.data.user;
      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch {
      return null;
    }
  }, []);

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

