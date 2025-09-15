import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Home, FileQuestionMark, BookAIcon } from "lucide-react";


const menuItems = [
  { name: "Home", path: "/", icon: <Home className="w-5 h-5 inline mr-2" /> },
  { name: "About", path: "/About", icon: <FileQuestionMark className="w-5 h-5 inline mr-2" /> },
  { name: "Meetings", path: "/Meetings", icon: <BookAIcon className="w-5 h-5 inline mr-2" /> },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-100 text-secondary border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-10 flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">

        {/* Branding */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary mb-2">
            Computing & Innovation Society
          </h1>
          <p className="text-sm sm:text-base">
            Laikipia University – Official meeting minutes archive maintained by the Secretary General.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-primary transition flex items-center gap-1"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>

        {/* Contact / Social */}
        <div className="flex-1 flex flex-col items-start sm:items-end gap-3">
          <p className="text-sm">
            Contact:{" "}
            <a
              href="mailto:info@computinginnovation.lu"
              className="hover:text-primary transition"
            >
              info@computinginnovation.lu
            </a>
          </p>
          <div className="flex gap-4 mt-2 text-xl text-primary">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 text-sm text-secondary text-center sm:text-left border-t border-base-300">
        &copy; {new Date().getFullYear()} Computing & Innovation Society of Laikipia University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
