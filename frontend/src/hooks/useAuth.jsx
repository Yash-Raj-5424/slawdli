import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  completeUserProfile,
  fetchCurrentUser,
  loginUser,
  registerUser,
  updateUserProfile,
} from '../api/auth';
import { AUTH_TOKEN_KEY } from '../utils/constants';

const AuthContext = createContext(null);

function readToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function writeToken(token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = readToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await fetchCurrentUser();
      setUser(profile);
    } catch {
      writeToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = useCallback(async (credentials) => {
    const data = await registerUser(credentials);
    writeToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);
    writeToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    writeToken(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const profile = await updateUserProfile(updates);
    setUser(profile);
    return profile;
  }, []);

  const completeProfile = useCallback(async (details) => {
    const profile = await completeUserProfile(details);
    setUser(profile);
    return profile;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      updateProfile,
      completeProfile,
      refreshUser: loadUser,
    }),
    [user, loading, register, login, logout, updateProfile, completeProfile, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
