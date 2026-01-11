"use client";
import React, { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CartIcon from "@/_component/cartIcon/page";
import SearchBar from "@/_component/searchBar/page";
import Login from "@/_component/login/page";

const page = () => {
  const [scrollPosition, setscrollPosition] = useState(0);
  const [isVisible, setisVisible] = useState(true);
  const [open, setOpen] = useState(false);

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
      <div className="fixed z-1000 right-0 top-0 w-full ">
        <div
          className={`flex relative justify-between  transition-[0.5s] px-6 lg:px-25 py-2 md:py-3  ${
            scrollPosition > 50 ? "bg-(--bg-color)" : "bg-white"
          }`}
        >
          <Link
            href="/"
            className={`text-[1.1rem] font-semibold  flex items-center gap-x-2 ${
              scrollPosition > 50 ? "text-(--text-color)" : "text-(--bg-color)"
            }`}
          >
            <img src="/logo.png" alt="" className=" max-w-20 rounded-xl " />
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className={`icon md:hidden  cursor-pointer  text-(--bg-color) text-2xl  z-100001 flex  flex-wrap md:flex-nowrap justify-between items-center absolute left-[50%] bottom-11 ${
              scrollPosition > 50 ? "text-(--text-color)" : "text-(--bg-color)"
            }`}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div
            className={` ${
              open
                ? "flex bg-(--bg-color) absolute md:relative top-16 left-0 w-full h-auto mt-9 md:mt-0"
                : "hidden"
            } md:flex flex-col md:flex-row  items-center md:justify-center  `}
          >
            <ul className="flex flex-col md:flex-row md:text-center justify-center items-center md:space-x-0 gap-x-6 gap-y-5 py-5 ">
              <li className="relative">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-base md:text-(--bg-color) text-(--text-color) ${
                    scrollPosition > 50
                      ? "md:text-(--text-color) hover:text-(--main-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--main-color)"
                  }`}
                >
                  Home
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/category"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-base md:text-(--bg-color) text-(--text-color) ${
                    scrollPosition > 50
                      ? "md:text-(--text-color) hover:text-(--main-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--main-color)"
                  }`}
                >
                  Categories
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/productDetails/sales/all"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-base md:text-(--bg-color) text-(--text-color) ${
                    scrollPosition > 50
                      ? "md:text-(--text-color) hover:text-(--main-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--main-color)"
                  }`}
                >
                  Sales
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/brands"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-base md:text-(--bg-color) text-(--text-color) ${
                    scrollPosition > 50
                      ? "md:text-(--text-color) hover:text-(--main-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--main-color)"
                  }`}
                >
                  Brands
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-base md:text-(--bg-color) text-(--text-color) ${
                    scrollPosition > 50
                      ? "md:text-(--text-color) hover:text-(--main-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--main-color)"
                  }`}
                >
                  {" "}
                  About Us
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
          <SearchBar  />
          <Login />
          <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
