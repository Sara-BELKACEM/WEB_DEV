import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Événements", path: "/events" },
    { name: "Discussions", path: "/forum" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-700">
          Maroc <span className="text-blue-600">Digital Hub</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-gray-700 hover:text-purple-700 font-medium ${
                  isActive ? "text-purple-700 border-b-2 border-purple-700 pb-1" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            Inscription
          </Link>
        </div>
      </div>
    </nav>
  );
}
