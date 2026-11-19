/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type KieuGiaoDien = 'light' | 'dark';

interface ThemeContextType {
  theme: KieuGiaoDien;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<KieuGiaoDien>('light');

  const toggleTheme = () => {
    setTheme((giaoDienCu) => (giaoDienCu === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const duLieu = useContext(ThemeContext);
  if (!duLieu) {
    throw new Error('useTheme phải được dùng bên trong ThemeProvider');
  }
  return duLieu;
};