import { jsx as _jsx } from "react/jsx-runtime";
// ThemeContext.tsx
import { createContext, useState, useContext, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const toggleTheme = () => setIsDark(prev => !prev);
    useEffect(() => {
        setTheme(isDark ? darkTheme : lightTheme);
    }, [isDark]);
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme, isDark }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
