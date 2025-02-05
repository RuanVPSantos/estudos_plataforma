import React, { createContext, useContext, useState, useEffect } from 'react';
import { UsuarioInterface } from '../types';
import Api from '../api/api';
const api = new Api();

interface AuthContextType {
  user: UsuarioInterface | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsuarioInterface | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user } = await api.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      const { user } = await api.getUser(); // Busca os dados do usuário após o login
      setUser(user);
      return data;
    } catch (error) {
      throw new Error('Falha no login');
    }
  };

  const register = async (nome: string, email: string, senha: string) => {
    try {
      await api.register({ nome, email, senha });
    } catch (error) {
      throw new Error('Falha no registro');
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};