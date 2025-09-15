import { NavLink } from "react-router-dom";
import {
 
  LogOut,
  Pen,
  PenBox,
  User2,
  
} from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../Features/Auth/AuthSlice";
import { FaMeetup } from "react-icons/fa";

const navItems = [
   { name: "Manage Officials", path: "AllOfficials", icon: <FaMeetup className="text-indigo-400" /> },
  { name: "Manage Meetings", path: "AllMeetings", icon: <PenBox className="text-indigo-400" /> },
  { name: "Manage Attendees", path: "AllAttendees", icon: <User2 className="text-indigo-400" /> },
  { name: "Manage Topics", path: "AllTopics", icon: <User2 className="text-indigo-400" /> },
  { name: "Manage Signatures", path: "AllSignatures", icon: <Pen className="text-indigo-400" /> },
  { name: "Logout", path: "logout", icon: <LogOut className="text-red-500" /> },
];

export const AdminSideNav = ({ onNavItemClick }: { onNavItemClick?: () => void }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    onNavItemClick?.();
  };

  return (
    <aside
      className="
        flex flex-col
        h-full
        w-full md:w-64 lg:w-72
        bg-base-200 text-base-content
        p-4 rounded-lg shadow-md border border-blue-500
        overflow-y-auto
        max-h-screen
      "
    >
      {/* Header */}
      <h4 className="mb-6 flex items-center justify-center text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-500">
        <span className="mr-2">🛠️</span>
        Admin Panel
        <span className="ml-2">👑</span>
      </h4>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item, index) =>
          item.name === "Logout" ? (
            <button
              key={index}
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition w-full text-left"
              aria-label="Logout"
            >
              {item.icon}
              <span className="font-chewy">{item.name}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              end
              onClick={onNavItemClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-base-300 ${
                  isActive ? "bg-base-300 font-semibold text-primary" : ""
                }`
              }
              aria-label={`Go to ${item.name}`}
            >
              {item.icon}
              <span className="font-chewy">{item.name}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};
