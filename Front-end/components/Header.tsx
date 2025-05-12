"use client";
import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export default function NetflixNavbar() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent text-white">
      {/* Top bar */}
      <div className="mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center space-x-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/273/839/original/netflix-logo-transparent-free-png.png"
            alt="Netflix"
            className="h-[32px] md:h-[40px]"
          />

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-6 text-sm font-light">
            <li className="font-semibold">Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>

        {/* Right Icons Desktop*/}
        <div className="items-center space-x-4 text-sm hidden md:flex">
          <Search size={18} />
          <span className="hidden md:inline">Kids</span>
          <Bell size={18} />
          <div className="w-6 h-6 bg-white rounded cursor-pointer" />
        </div>
        {/* Right Icons mobile*/}
        <div className="flex items-center space-x-4 text-sm md:!hidden">
          <Search size={18} />
          <Bell size={18} />
          <div className="w-6 h-6 bg-white rounded cursor-pointer" />
        </div>
      </div>

      {/* Bottom menu (mobile only) */}
      <div className="md:hidden px-4 pb-4">
        <ul className="flex justify-around text-sm font-light text-white">
          <li className="font-semibold">TV Shows</li>
          <li>Movies</li>
          <li className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center space-x-1"
            >
              <span>Categories</span>
              <ChevronDown size={16} />
            </button>

            {showCategories && (
              <ul className="absolute left-0 mt-2 bg-black/90 rounded shadow-lg text-sm text-white w-40 p-2 space-y-2 z-10">
                <li className="hover:underline">Action</li>
                <li className="hover:underline">Comedy</li>
                <li className="hover:underline">Drama</li>
                <li className="hover:underline">Horror</li>
                <li className="hover:underline">Romance</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
