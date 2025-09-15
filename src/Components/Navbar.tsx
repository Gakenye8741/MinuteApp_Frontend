import {
  Home,
  FileQuestionMark,
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
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/About", icon: <FileQuestionMark className="w-5 h-5" /> },
    { name: "Meetings", path: "/Meetings", icon: <BookAIcon className="w-5 h-5" /> },
  ];

  const isActive = (path: string) =>
    location.pathname === path ? "text-primary font-bold" : "text-gray-500";

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
    <>
      {/* Desktop Navbar */}
      <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur text-base-content shadow-sm border-b border-base-300 transition-all hidden lg:flex">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-bold leading-tight text-left">
            Computing And Innovation <br /> Society of Laikipia University
          </Link>
        </div>

        <div className="navbar-center">
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
            <Link to="/login" className={`btn btn-primary ${isActive("/login")}`}>
              <LogIn className="inline mr-2 h-4 w-4" /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-base-100/90 backdrop-blur border-t border-base-300 shadow-inner lg:hidden z-50">
        <div className="flex justify-around py-2 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs ${isActive(item.path)}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="dropdown dropdown-top">
              <button tabIndex={0} className="flex flex-col items-center text-xs">
                <User className="w-5 h-5" />
                <span>Me</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 shadow rounded-box w-40 mt-1 right-0"
              >
                {role === "Chairman" || role === "Secretary General" ? (
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
              className={`flex flex-col items-center text-xs ${isActive("/login")}`}
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
