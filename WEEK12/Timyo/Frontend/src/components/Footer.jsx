import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-10 text-sm">
      © {new Date().getFullYear()} Timyo — All rights reserved
    </footer>
  );
}
