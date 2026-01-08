"use client";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";



function page() {
     const [dropdownOpen, setDropdownOpen] = useState(false);
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
       <div className="relative pt-1">
                   <button
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className={` text-xl ${
                       scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
                     } bg-transparent  rounded cursor-pointer`}
                   >
                     <FaRegCircleUser />
                   </button>
                   {dropdownOpen && (
                     <div className="absolute right-0 mt-6 w-40 bg-(--bg-color) border border-(--text-color) shadow-lg rounded z-10 text-center">
                       <Link
                         href="/login"
                         onClick={() => setDropdownOpen(false)}
                         className={`block px-4 py-2 text-sm hover:bg-gray-100 text-(--text-color) `}
                       >
                         Login
                       </Link>
       
                       <Link
                         href="/Signup"
                         onClick={() => setDropdownOpen(false)}
                         className={`block px-4 py-2 text-sm hover:bg-gray-100 text-(--text-color) `}
                       >
                         Signup
                       </Link>
                     </div>
                   )}
                 </div>

    </div>
  )
}

export default page