import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { LogOut, Pen, PenBox, User2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../Features/Auth/AuthSlice";
import { FaMeetup } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";
const navItems = [
    { name: "Manage Officials", path: "AllOfficials", icon: _jsx(FaMeetup, {}) },
    { name: "Manage Meetings", path: "AllMeetings", icon: _jsx(PenBox, {}) },
    { name: "Manage Attendees", path: "AllAttendees", icon: _jsx(User2, {}) },
    { name: "Manage Topics", path: "AllTopics", icon: _jsx(User2, {}) },
    { name: "Manage Signatures", path: "AllSignatures", icon: _jsx(Pen, {}) },
    { name: "Logout", path: "logout", icon: _jsx(LogOut, {}) },
];
export const AdminSideNav = ({ onNavItemClick }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme(); // ThemeContext
    const handleLogout = () => {
        dispatch(clearCredentials());
        onNavItemClick?.();
    };
    // Dynamic colors for light/dark mode
    const getActiveTabStyles = () => {
        // Example: Assume dark mode if base-content is a light color (e.g., "#fff" or "white")
        const isDark = theme["base-content"] === "#fff" || theme["base-content"].toLowerCase() === "white";
        if (isDark) {
            return { bg: theme.primary + "22", text: theme.primary }; // Slightly transparent primary for dark mode
        }
        else {
            return { bg: theme.primary, text: theme["base-100"] }; // Primary background with white text in light mode
        }
    };
    const activeTab = getActiveTabStyles();
    return (_jsxs("aside", { className: "flex flex-col h-full w-full md:w-64 lg:w-72 p-4 rounded-lg shadow-md overflow-y-auto max-h-screen transition-colors duration-300", style: {
            backgroundColor: theme["base-200"],
            color: theme["base-content"],
            borderColor: theme.primary,
        }, children: [_jsxs("h4", { className: "mb-6 flex items-center justify-center text-lg md:text-xl font-extrabold text-transparent bg-clip-text", style: {
                    backgroundImage: "linear-gradient(to right, #4f46e5, #8b5cf6, #f59e0b)",
                }, children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDEE0\uFE0F" }), "Admin Panel", _jsx("span", { className: "ml-2", children: "\uD83D\uDC51" })] }), _jsx("nav", { className: "flex flex-col space-y-2", children: navItems.map((item, index) => item.name === "Logout" ? (_jsxs("button", { onClick: handleLogout, className: "flex items-center gap-3 px-3 py-2 rounded-lg transition w-full text-left", style: {
                        color: theme.error,
                    }, onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = theme["base-300"]), onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = theme["base-200"]), "aria-label": "Logout", children: [item.icon, _jsx("span", { className: "font-chewy", children: item.name })] }, index)) : (_jsxs(NavLink, { to: item.path, end: true, onClick: onNavItemClick, style: ({ isActive }) => ({
                        backgroundColor: isActive ? activeTab.bg : "transparent",
                        color: isActive ? activeTab.text : theme["base-content"],
                    }), className: "flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[rgba(255,255,255,0.05)]", "aria-label": `Go to ${item.name}`, children: [item.icon, _jsx("span", { className: "font-chewy", children: item.name })] }, index))) })] }));
};
