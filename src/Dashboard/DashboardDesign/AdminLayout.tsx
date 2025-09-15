import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";


import { AdminSideNav } from "./AdminSideNav";
import { useTheme } from "../../ThemeContext";
import ThemeToggle from "../../ThemeToggle";
import { Navbar } from "../../Components/Navbar";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme(); // Get current theme colors

  return (
    <>
      {/* Navbar with ThemeToggle */}
      <Navbar>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </Navbar>

      <div
        className="flex h-screen relative transition-colors duration-300"
        style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
      >
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg border shadow-lg transition"
          style={{
            backgroundColor: theme["base-300"],
            color: theme["base-content"],
            borderColor: theme.primary,
          }}
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Sidebar */}
        <aside
          className="hidden md:block w-64 h-full fixed top-[4.5rem] left-0 z-30 border-r shadow-xl transition-colors duration-300"
          style={{
            backgroundColor: theme["base-200"],
            color: theme["base-content"],
            borderColor: theme.primary,
          }}
        >
          <AdminSideNav onNavItemClick={() => {}} />
        </aside>

        {/* Mobile Sidebar + Overlay */}
        {sidebarOpen && (
          <>
            {/* Dark overlay */}
            <div
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ backgroundColor: theme.neutral + "99" }} // semi-transparent
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Mobile Sidebar */}
            <aside
              className="fixed top-0 left-0 z-50 w-64 h-full border-r shadow-xl md:hidden transition-colors duration-300"
              style={{
                backgroundColor: theme["base-200"],
                color: theme["base-content"],
                borderColor: theme.primary,
              }}
            >
              <AdminSideNav onNavItemClick={() => setSidebarOpen(false)} />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto p-4 md:ml-64 pt-[5rem] transition-colors duration-300"
          style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
