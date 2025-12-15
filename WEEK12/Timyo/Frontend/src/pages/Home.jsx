import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Timyo</h1>
        {user && <p>Hello, {user.name}!</p>}
        {!user && <p>Please login or register to continue.</p>}
      </div>
      <Footer />
    </>
  );
}
