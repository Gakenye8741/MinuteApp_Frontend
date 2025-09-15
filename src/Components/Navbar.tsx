import {
  Home,
  FileQuestionMark,
  Users,
  Phone,
  LogIn,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  User,
  LogOut,
  BookAIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../App/store";
import { clearCredentials } from "../Features/Auth/AuthSlice";

export const Navbar = () => {
  const [theme, setTheme] = useState<"garden" | "dark">("garden");
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const username = useSelector((state: RootState) => state.auth.user?.username);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About", path: "/About", icon: <FileQuestionMark className="w-4 h-4" /> },
    { name: "Meetings", path: "/Meetings", icon: <BookAIcon className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => (location.pathname === path ? "text-primary font-bold" : "");

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "garden" ? "dark" : "garden"));
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur text-base-content shadow-sm border-b border-base-300 transition-all">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown (mobile menu) */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className={isActive(item.path)}>
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <li>
                <Link to="/login" className={isActive("/login")}>
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo / Title */}
        <Link to="/" className="btn btn-ghost text-xl font-bold leading-tight text-left">
          <span className="block lg:hidden">E.B.H.S</span>
          <span className="hidden lg:block">
            Computing And Innovation <br /> Society of Laikipia University
          </span>
        </Link>
      </div>

      {/* Navbar Center (desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className={isActive(item.path)}>
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Auth Section */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end group">
            <label tabIndex={0} className="flex items-center cursor-pointer">
              <div className="btn btn-outline btn-primary capitalize flex items-center gap-2">
                Hey {username}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 shadow rounded-box w-52 mt-2 z-20">
              <li>
                {role === "Chairman" || role === "Secretary General" ? (
                  <Link to="/Admindashboard/AllMeetings" className="font-bold flex items-center gap-2">
                    <UserCheck className="h-5 w-5" /> Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="font-bold flex items-center gap-2">
                    <User className="h-5 w-5" /> User Dashboard
                  </Link>
                )}
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden lg:flex gap-2 font-chewy text-lg">
            <Link to="/login" className={`btn btn-primary ${isActive("/login")}`}>
              <LogIn className="inline mr-2 h-4 w-4" /> Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
