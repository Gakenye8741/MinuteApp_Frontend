// ThemeToggle.tsx
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
    </button>
  );
};

export default ThemeToggle;
