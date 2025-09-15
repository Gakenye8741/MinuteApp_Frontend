import React, { ReactNode } from "react";
import {
  Home,
  FileQuestionMark,
  LogIn,
  ChevronDown,
  UserCheck,
  User,
  LogOut,
  BookAIcon,
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
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const username = useSelector((state: RootState) => state.auth.user?.username);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/About", icon: <FileQuestionMark className="w-5 h-5" /> },
    { name: "Meetings", path: "/Meetings", icon: <BookAIcon className="w-5 h-5" /> },
  ];

  const isActive = (path: string) =>
    location.pathname === path ? "font-bold" : "";

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <>
      {/* Desktop Navbar (hidden on small screens) */}
      <div
        className="navbar fixed top-0 left-0 right-0 z-50 hidden lg:flex shadow-sm border-b"
        style={{
          backgroundColor: theme["base-100"] + "e6",
          color: theme["base-content"],
          borderColor: theme["base-200"],
        }}
      >
        {/* Left */}
        <div className="navbar-start flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold leading-tight text-left whitespace-normal"
            style={{ color: theme.primary }}
          >
            Computing And Innovation <br /> Society of Laikipia University
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center flex-1">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 ${isActive(item.path)}`}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex-1 justify-end gap-2">
          {children || <ThemeToggle />}
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="flex items-center cursor-pointer">
                <div
                  className="btn btn-outline capitalize flex items-center gap-2"
                  style={{ borderColor: theme.primary }}
                >
                  Hey {username}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content shadow rounded-box w-52 mt-2"
                style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
              >
                {(role === "Chairman" || role === "Secretary General") ? (
                  <li>
                    <Link to="/Admindashboard/AllMeetings" className="font-bold flex items-center gap-2">
                      <UserCheck className="h-5 w-5" /> Admin Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/dashboard" className="font-bold flex items-center gap-2">
                      <User className="h-5 w-5" /> User Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
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
        className="fixed bottom-0 left-0 w-full flex justify-around items-center lg:hidden border-t shadow-inner z-50"
        style={{
          backgroundColor: theme["base-100"],
          borderColor: theme["base-200"],
          color: theme["base-content"],
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-xs py-2 flex-1 transition-colors duration-150 ${
              isActive(item.path) ? "font-bold" : ""
            } hover:bg-[${theme["base-200"]}] active:bg-[${theme["base-300"]}]`}
          >
            {item.icon}
            <span className="text-[10px] truncate">{item.name}</span>
          </Link>
        ))}

        {/* Theme Toggle (only once here on mobile) */}
        <div className="flex flex-col items-center text-xs py-2 flex-1">
          <ThemeToggle />
          <span className="text-[10px] truncate">Theme</span>
        </div>

        {/* Auth Section */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-top dropdown-end">
            <button tabIndex={0} className="flex flex-col items-center text-xs py-2 flex-1">
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
            className="flex flex-col items-center text-xs py-2 flex-1"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] truncate">Login</span>
          </Link>
        )}
      </div>
    </>
  );
};
