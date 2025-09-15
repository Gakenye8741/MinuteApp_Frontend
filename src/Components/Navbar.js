import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Home, FileQuestionMark, LogIn, ChevronDown, UserCheck, User, LogOut, BookAIcon, } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { clearCredentials } from "../Features/Auth/AuthSlice";
import ThemeToggle from "../ThemeToggle";
export const Navbar = ({ children }) => {
    const { theme, toggleTheme, isDark } = useTheme(); // Global theme
    const dispatch = useDispatch();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);
    const username = useSelector((state) => state.auth.user?.username);
    const menuItems = [
        { name: "Home", path: "/", icon: _jsx(Home, { className: "w-5 h-5" }) },
        { name: "About", path: "/About", icon: _jsx(FileQuestionMark, { className: "w-5 h-5" }) },
        { name: "Meetings", path: "/Meetings", icon: _jsx(BookAIcon, { className: "w-5 h-5" }) },
    ];
    const isActive = (path) => location.pathname === path
        ? `font-bold ${theme.primary}`
        : theme["base-content"];
    const handleLogout = () => {
        dispatch(clearCredentials());
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "navbar fixed top-0 left-0 right-0 z-50 flex flex-wrap hidden lg:flex shadow-sm border-b", style: {
                    backgroundColor: theme["base-100"] + "e6", // slightly transparent
                    color: theme["base-content"],
                    borderColor: theme["base-200"],
                }, children: [_jsx("div", { className: "navbar-start flex-1 min-w-0", children: _jsxs(Link, { to: "/", className: "btn btn-ghost text-xl font-bold leading-tight text-left whitespace-normal", style: { color: theme.primary }, children: ["Computing And Innovation ", _jsx("br", {}), " Society of Laikipia University"] }) }), _jsx("div", { className: "navbar-center flex-1 min-w-0", children: _jsx("ul", { className: "menu menu-horizontal px-1 flex-1 flex-wrap", children: menuItems.map((item) => (_jsx("li", { children: _jsxs(Link, { to: item.path, className: `flex items-center gap-1 ${isActive(item.path)}`, children: [item.icon, " ", item.name] }) }, item.name))) }) }), _jsxs("div", { className: "navbar-end flex-1 min-w-0 justify-end gap-2", children: [children, " ", !children && _jsx(ThemeToggle, {}), isAuthenticated ? (_jsxs("div", { className: "dropdown dropdown-end relative z-[9999] group", children: [_jsx("label", { tabIndex: 0, className: "flex items-center cursor-pointer", children: _jsxs("div", { className: "btn btn-outline capitalize flex items-center gap-2", style: { borderColor: theme.primary, color: theme["base-content"] }, children: ["Hey ", username, _jsx(ChevronDown, { className: "h-4 w-4 transition-transform duration-200 group-hover:rotate-180" })] }) }), _jsxs("ul", { tabIndex: 0, className: "menu dropdown-content shadow rounded-box w-52 mt-2", style: { backgroundColor: theme["base-100"], color: theme["base-content"] }, children: [(role === "Chairman" || role === "Secretary General") ? (_jsx("li", { children: _jsxs(Link, { to: "/Admindashboard/AllMeetings", className: "font-bold flex items-center gap-2", children: [_jsx(UserCheck, { className: "h-5 w-5" }), " Admin Dashboard"] }) })) : (_jsx("li", { children: _jsxs(Link, { to: "/dashboard", className: "font-bold flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5" }), " User Dashboard"] }) })), _jsx("li", { children: _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 w-full text-left", children: [_jsx(LogOut, { className: "h-5 w-5" }), " Logout"] }) })] })] })) : (_jsxs(Link, { to: "/login", className: "btn btn-primary", style: { backgroundColor: theme.primary, color: theme["base-100"] }, children: [_jsx(LogIn, { className: "inline mr-2 h-4 w-4" }), " Login"] }))] })] }), _jsxs("div", { className: "fixed bottom-0 left-0 w-full flex justify-around py-1 items-center lg:hidden shadow-inner", style: { backgroundColor: theme["base-100"] + "e6", borderColor: theme["base-200"] }, children: [menuItems.map((item) => (_jsxs(Link, { to: item.path, className: `flex flex-col items-center text-xs min-w-0 ${isActive(item.path)}`, children: [item.icon, _jsx("span", { className: "text-[10px] truncate", children: item.name })] }, item.name))), _jsx(ThemeToggle, {}), isAuthenticated ? (_jsxs("div", { className: "dropdown dropdown-top dropdown-end relative z-[9999]", children: [_jsxs("button", { tabIndex: 0, className: "flex flex-col items-center text-xs min-w-0", children: [_jsx(User, { className: "w-5 h-5" }), _jsx("span", { className: "text-[10px] truncate", children: "Me" })] }), _jsxs("ul", { tabIndex: 0, className: "menu dropdown-content shadow rounded-box mt-1 min-w-max p-2", style: { backgroundColor: theme["base-100"], color: theme["base-content"] }, children: [(role === "Chairman" || role === "Secretary General") ? (_jsx("li", { children: _jsxs(Link, { to: "/Admindashboard/AllMeetings", className: "flex items-center gap-2", children: [_jsx(UserCheck, { className: "w-4 h-4" }), " Admin Dashboard"] }) })) : (_jsx("li", { children: _jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4" }), " User Dashboard"] }) })), _jsx("li", { children: _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 w-full text-left", children: [_jsx(LogOut, { className: "w-4 h-4" }), " Logout"] }) })] })] })) : (_jsxs(Link, { to: "/login", className: `flex flex-col items-center text-xs min-w-0 ${isActive("/login")}`, style: { color: theme["base-content"] }, children: [_jsx(LogIn, { className: "w-5 h-5" }), _jsx("span", { className: "text-[10px] truncate", children: "Login" })] }))] })] }));
};
