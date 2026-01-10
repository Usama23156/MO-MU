"use client";
import React, { useEffect, useState } from "react";

function page() {
  const [searchQuery, setSearchQuery] = useState(""); // القيمة اللي بيكتبها المستخدم
  const [searchResults, setSearchResults] = useState([]); // النتائج اللي هتظهر
  const [scrollPosition, setscrollPosition] = useState(0);
  const [isVisible, setisVisible] = useState(true);

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
    <div>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className={` py-1 rounded border border-(--bg-color) focus:outline-none [] text-(--text-color) ${
            scrollPosition > 50 ? "border-(--main-color)" : ""
          } `}
        />
        {/* قائمة النتائج */}
        {searchQuery && searchResults.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-50 max-h-60 overflow-y-auto">
            {searchResults.map((item) => (
              <li
                // key={item.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // عند الضغط على النتيجة ممكن توصل لصفحة المنتج
                  // window.location.href = `/product/${item.id}`;
                }}
              >
                {/* {item.name} */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default page;
