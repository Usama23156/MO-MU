"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";


function page() {
  const [searchQuery, setSearchQuery] = useState(""); // القيمة اللي بيكتبها المستخدم
  const [searchResults, setSearchResults] = useState([]); // النتائج اللي هتظهر
  const [scrollPosition, setscrollPosition] = useState(0);
  const [isVisible, setisVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);


  useEffect(() => {
    const handelScroll = () => {
      const currentScrollState = window.scrollY;
      if (currentScrollState > scrollPosition && currentScrollState > 50) {
        setisVisible(false);
      } else {
        setisVisible(true);
      }
      setscrollPosition(currentScrollState);
    };
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, [scrollPosition]);

  return (
  <div className="md:pr-20">

    {/* 🔍 Search Icon - Mobile */}
    <div className="md:hidden flex justify-end">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className={` ${
              scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
            }`}
      >
        <FaSearch size={20} />
      </button>
    </div>

    {/* 🔎 Search Input */}
    <div
      className={`relative ${
        showSearch ? "block" : "hidden"
      } md:block`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className={`w-full py-1 rounded border border-(--bg-color) focus:outline-none text-(--text-color) px-3 ${
          scrollPosition > 50 ? "border-(--main-color)" : ""
        }`}
      />

      {/* Results */}
      {searchQuery && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-50 max-h-60 overflow-y-auto">
          {searchResults.map((item, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* item.name */}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

}

export default page;
