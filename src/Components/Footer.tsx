import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Home, FileQuestionMark, BookAIcon } from "lucide-react";
import { useTheme } from "../ThemeContext";

const menuItems = [
  { name: "Home", path: "/", icon: <Home className="w-5 h-5 inline mr-2" /> },
  { name: "About", path: "/About", icon: <FileQuestionMark className="w-5 h-5 inline mr-2" /> },
  { name: "Meetings", path: "/Meetings", icon: <BookAIcon className="w-5 h-5 inline mr-2" /> },
];

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer style={{ backgroundColor: theme["base-100"], color: theme["base-content"], borderTop: `1px solid ${theme["base-300"]}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-10 flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">

        {/* Branding */}
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Computing & Innovation Society
          </h1>
          <p className="text-sm sm:text-base" style={{ color: theme["base-content"] }}>
            Laikipia University – Official meeting minutes archive maintained by the Secretary General.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-1 transition hover:brightness-90"
              style={{ color: theme["base-content"] }}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>

        {/* Contact / Social */}
        <div className="flex-1 flex flex-col items-start sm:items-end gap-3">
          <p className="text-sm" style={{ color: theme["base-content"] }}>
            Contact:{" "}
            <a
              href="mailto:info@computinginnovation.lu"
              className="transition hover:brightness-90"
              style={{ color: theme.primary }}
            >
              info@computinginnovation.lu
            </a>
          </p>
          <div className="flex gap-4 mt-2 text-xl" style={{ color: theme.primary }}>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-700">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 text-sm text-center sm:text-left"
        style={{ color: theme["base-content"], borderTop: `1px solid ${theme["base-300"]}` }}
      >
        &copy; {new Date().getFullYear()} Computing & Innovation Society of Laikipia University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
