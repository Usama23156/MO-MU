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
            className={`icon md:hidden  cursor-pointer  text-(--bg-color) text-2xl  z-100001 flex  flex-wrap md:flex-nowrap justify-between items-center absolute left-[47%] bottom-11 ${
              scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
            }`}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div
            className={`
    absolute md:static left-0 w-full
    bg-(--bg-color) md:bg-transparent
    overflow-hidden
    transform-gpu
    transition-all duration-500 ease-in-out
    md:transform-none md:opacity-100 md:max-h-full
    mt-25 md:mt-3
    ${
      open ? "opacity-100 max-h-125 rotateX-0" : "opacity-0 max-h-0 -rotateX-90"
    }
  `}
            style={{ transformOrigin: "top" }}
          >
            <ul className="flex flex-col md:flex-row md:text-center justify-center items-center md:space-x-0 gap-x-6 gap-y-5 py-5 ">
              <li className="relative">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color)  hover:text-(--text-color)"
                  }`}
                >
                 الرئسيه
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/category"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color)  hover:text-(--text-color)"
                  }`}
                >
                  الاقسام
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/productDetails/sales/all"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color)  hover:text-(--text-color)"
                  }`}
                >
                  العروض
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/brands"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color)  hover:text-(--text-color)"
                  }`}
                >
                  الشركات
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color)  hover:text-(--text-color)"
                  }`}
                >
                  {" "}
                  من نحن
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <SearchBar />
            <CartIcon />
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
