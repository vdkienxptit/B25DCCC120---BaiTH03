/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const tenDangNhap = localStorage.getItem('shopmini_user');
    return tenDangNhap ? { tenDangNhap } : null;
  });

  const login = (username: string, password: string): boolean => {
    if (username.trim() !== '' && password === '123456') {
      const nguoiDung = { tenDangNhap: username.trim() };
      localStorage.setItem('shopmini_user', nguoiDung.tenDangNhap);
      setUser(nguoiDung);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('shopmini_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const duLieu = useContext(AuthContext);
  if (!duLieu) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider');
  }
  return duLieu;
};