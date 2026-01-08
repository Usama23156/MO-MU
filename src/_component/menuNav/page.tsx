"use client"; // Ensure this directive is at the top

import React, { useState, useMemo, useEffect } from "react";
import { Menu } from "../../data/data"; // Adjust the path as necessary
import ProductPopp from "@/_component/productPopp/page"; // Adjust the path as necessary

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const menus: {
    id: number;
    name: string;
    items: {
      id: number;
      name: string;
      img: string;
      price: number;
    }[];
  }[] = Menu;

  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  useEffect(() => {
    if (menus.length > 0) {
      setActiveTabId(menus[0].id); 
    }
  }, [menus]);

  const openModal = (item: any) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const activeItems = useMemo(() => {
    const activeMenu = menus.find((menu) => menu.id === activeTabId);
    return activeMenu ? activeMenu.items : [];
  }, [activeTabId, menus]);

  return (
    <div>
      <div className="justify-between items-center transition-[0.5s] px-6 `lg:px-[100px]` py-2 md:py-3">
        <div className="flex md:relative left-0 w-full h-auto lg:flex flex-col md:flex-row items-center md:justify-center">
          <div className="px-4 py-4 md:py-7 flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-4 xl:px-37.5">
            <div className="w-full overflow-x-auto">
              <ul className="flex flex-row justify-center items-start lg:items-center gap-2 md:gap-0 mt-5 lg:mt-0 pl-36 md:pl-0">
                {menus.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-center items-center gap-2 uppercase `font-[600]` text-[#3E445A] text-sm lg:text-[15px] px-3 py-2 md:py-3 dosis"
                    onClick={() => setActiveTabId(item.id)} 
                  >
                    <div
                      className={`cursor-pointer ${activeTabId === item.id ? "font-bold" : ""}`}
                    >
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex flex-col mt-10 mb-10">
        <div className="p-10 max-w-full ml-auto mr-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {activeItems.length > 0 ? (
            activeItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)} // Open modal on click
                className="p-0 mb-2 flex flex-col justify-center rounded-lg border `border-[color:var(--bg-color)]` shadow-lg hover:scale-95 transition-all duration-200 relative overflow-hidden w-full cursor-pointer"
              >
                <div className="pb-0">
                  <div className="aspect-square w-36 h-24 rounded-lg rounded-b-none mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.name} // Use item.name for better accessibility
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="px-5 pt-0">
                  <h3 className="text-[0.9rem] font-medium text-black ">{item.name}</h3>
                  <span className="text-[13px] text-black">{item.price} EGP</span>
                </div>
                <div className="flex justify-center items-center mb-2 mt-2">
                  <button className="`bg-[color:var(--bg-color)]` text-white py-1 text-center `hover:bg-[color:var(--main-color)]` transition-all duration-200 rounded-3xl px-3 cursor-pointer">
                    Add to Basket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div role="status" className="items-center justify-center w-full h-full text-center col-span-6">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 text-center mx-auto"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
      { isModalOpen && ( <ProductPopp isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />  )}
    </div>
  );
}

export default Page; // Ensure the component is exported correctly