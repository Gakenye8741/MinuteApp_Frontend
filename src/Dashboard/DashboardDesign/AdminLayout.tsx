import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Menu } from "lucide-react";
import { Navbar } from "../../Components/Navbar";
import { AdminSideNav } from "./AdminSideNav";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-base-100 text-base-content relative">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-base-300 text-base-content rounded-lg border border-blue-500 shadow-lg hover:bg-base-200 transition"
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 h-full fixed top-[4.5rem] left-0 z-30 bg-base-200 border-r border-blue-500 shadow-xl">
          <AdminSideNav onNavItemClick={() => {}} />
        </aside>

        {/* Mobile Sidebar + Overlay */}
        {sidebarOpen && (
          <>
            {/* Dark overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Mobile Sidebar */}
            <aside className="fixed top-0 left-0 z-50 w-64 h-full bg-base-200 text-base-content border-r border-blue-500 shadow-xl md:hidden">
              <AdminSideNav onNavItemClick={() => setSidebarOpen(false)} />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:ml-64 pt-[5rem] bg-base-100 text-base-content transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </>
  );
};
