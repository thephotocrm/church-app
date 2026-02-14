import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@church-app/shared';
import { api } from '../services/api';
import { tokenStorage } from '../services/tokenStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const token = await tokenStorage.get();
      if (token) {
        const user = await api.getMe(token);
        setState({ user, token, isLoading: false, isAuthenticated: true });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      await tokenStorage.remove();
      setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    }
  }

  async function login(email: string, password: string) {
    const { token, user } = await api.login(email, password);
    await tokenStorage.set(token);
    setState({ user, token, isLoading: false, isAuthenticated: true });
  }

  async function register(name: string, email: string, password: string) {
    await api.register(name, email, password);
  }

  async function logout() {
    await tokenStorage.remove();
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
