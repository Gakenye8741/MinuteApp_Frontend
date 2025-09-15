// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export const lightTheme = {
  primary: "#4f46e5",
  secondary: "#10b981",
  accent: "#f59e0b",
  neutral: "#6b7280",
  "base-100": "#ffffff",
  "base-200": "#f3f4f6",
  "base-300": "#e5e7eb",
  "base-content": "#111827",
  info: "#3b82f6",
  success: "#16a34a",
  warning: "#facc15",
  error: "#dc2626",
};

export const darkTheme = {
  primary: "#6272a4",
  secondary: "#ff79c6", // replace if you want no pink
  accent: "#8be9fd",
  neutral: "#44475a",
  "base-100": "#282a36",
  "base-200": "#44475a",
  "base-300": "#6272a4",
  "base-content": "#f8f8f2",
  info: "#8be9fd",
  success: "#50fa7b",
  warning: "#f1fa8c",
  error: "#ff5555",
};

type Theme = typeof lightTheme;

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
