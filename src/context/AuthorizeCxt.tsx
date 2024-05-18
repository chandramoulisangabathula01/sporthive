import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthorizeCxt = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('authToken'));

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const contextValue: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthorizeCxt.Provider value={contextValue}>{children}</AuthorizeCxt.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthorizeCxt);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};