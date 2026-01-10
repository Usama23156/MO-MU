"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";

function Page() {
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItems = useSelector((state: any) => state.cart.products);

  const totalItems = useMemo(() => {
    if (!isClient) return 0;

    return cartItems.reduce((total: number, item: any) => {
      return total + item.count;
    }, 0);
  }, [cartItems, isClient]);

  const totalPrice = useMemo(() => {
    if (!isClient) return 0;

    return cartItems.reduce((total: number, item: any) => {
      return total + item.totalPrice;
    }, 0);
  }, [cartItems, isClient]);

  return (
    <div>
      <Link href="/cart">
        <div className="relative">
          {isClient && totalItems > 0 && (
            <div className="absolute bottom-6 right-0  text-(--text-color) text-[12px]  font-bold w-4 h-4 rounded-full text-center">
              {totalItems}
            </div>
          )}
          <button
            className={` text-2xl ${
              scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
            } bg-transparent  rounded cursor-pointer`}
          >
            <IoCartOutline />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Page;
