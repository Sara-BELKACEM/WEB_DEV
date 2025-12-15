import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Timyo</Link>

        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className={`sm:flex sm:space-x-4 ${open ? "block" : "hidden"}`}>
          <Link to="/">Home</Link>
          {user && user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
          {user && user.role === "user" && <Link to="/dashboard">User Dashboard</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <button onClick={logout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
