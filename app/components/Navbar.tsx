"use client";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="text-lg font-bold tracking-wide">AM Inc</div>
      <button className="p-2 rounded-md hover:bg-gray-800 transition">
        <Menu className="h-6 w-6" />
      </button>
    </nav>
  );
}
