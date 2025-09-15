import React, { ReactNode } from "react";
import {
  Home,
  FileQuestionMark,
  LogIn,
  UserCheck,
  User,
  LogOut,
  Book,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { clearCredentials } from "../Features/Auth/AuthSlice";
import type { RootState } from "../App/store";
import ThemeToggle from "../ThemeToggle";

interface NavbarProps {
  children?: ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { theme, isDark } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.auth.role);
  const username = useSelector((state: RootState) => state.auth.user?.username);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/about", icon: <FileQuestionMark className="w-5 h-5" /> },
    { name: "Meetings", path: "/meetings", icon: <Book className="w-5 h-5" /> },
  ];

  const handleLogout = () => dispatch(clearCredentials());

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className="navbar fixed top-0 left-0 right-0 z-50 hidden lg:flex shadow-sm border-b"
        style={{
          backgroundColor: theme["base-100"] + "e6",
          color: theme["base-content"],
          borderColor: theme["base-200"],
        }}
      >
        {/* Left */}
        <div className="navbar-start flex-1 min-w-0">
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold leading-tight text-left whitespace-normal"
            style={{ color: theme.primary }}
          >
            Computing And Innovation <br /> Society of Laikipia University
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center flex-1 min-w-0">
          <ul className="menu menu-horizontal px-1 flex-1 flex-wrap">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 ${
                    location.pathname === item.path ? "font-bold" : ""
                  }`}
                  style={{
                    color:
                      location.pathname === item.path
                        ? theme.primary
                        : theme["base-content"],
                  }}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex-1 min-w-0 justify-end gap-2">
          {children || <ThemeToggle />}

          {isAuthenticated ? (
            <div className="dropdown dropdown-end relative z-[9999] group">
              <label tabIndex={0} className="flex items-center cursor-pointer">
                <div
                  className="btn btn-outline capitalize flex items-center gap-2"
                  style={{
                    borderColor: theme.primary,
                    color: theme["base-content"],
                  }}
                >
                  Hey {username}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content shadow rounded-box w-52 mt-2"
                style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
              >
                {(role === "Chairman" || role === "Secretary General") ? (
                  <li>
                    <Link
                      to="/Admindashboard/AllMeetings"
                      className="flex items-center gap-2 font-bold"
                    >
                      <UserCheck className="h-5 w-5" /> Admin Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 font-bold">
                      <User className="h-5 w-5" /> User Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
            >
              <LogIn className="inline mr-2 h-4 w-4" /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div
        className="fixed bottom-0 left-0 w-full flex justify-around py-2 items-center lg:hidden shadow-inner z-50 border-t rounded-t-xl"
        style={{
          backgroundColor: isDark ? "#1f1f1f" : "#f3f4f6",
          borderColor: isDark ? "#333" : "#d1d5db",
        }}
      >
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs min-w-0 p-2 rounded-lg transition
                ${active
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : ""
                }
                hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]
              `}
            >
              {item.icon}
              <span className="text-[10px] truncate">{item.name}</span>
            </Link>
          );
        })}

        {/* Theme Toggle */}
        <div className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]">
          <ThemeToggle />
        </div>

        {/* Auth / Me Dropdown */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-top dropdown-end relative z-[9999]">
            <button
              tabIndex={0}
              className={`flex flex-col items-center text-xs min-w-0 p-2 rounded-lg
                hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]
              `}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] truncate">Me</span>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content shadow rounded-box mt-1 min-w-max p-2"
              style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
            >
              {(role === "Chairman" || role === "Secretary General") ? (
                <li>
                  <Link to="/Admindashboard/AllMeetings" className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" /> Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> User Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className={`flex flex-col items-center text-xs min-w-0 p-2 rounded-lg
              hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]
            `}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] truncate">Login</span>
          </Link>
        )}
      </div>
    </>
  );
};
