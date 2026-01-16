import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { product } from "@/types/products";
import ProductPopp from "@/_component/productPopp/page";
import Link from "next/link";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const openModal = (item: any) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const filteredProducts = useMemo(() => {
  if (!products || products.length === 0) return [];

  return products
    .filter((p) => p.sale === true)
    .slice(0, 4);
}, [products]);
  return (
    <div>
      <div className="bg-gray-100 md:flex items-center justify-between px-8 py-8 mb-10 relative ">
        
        <div className=" bg-white rounded-2xl mb-13  h-85 flex flex-col items-center md:items-center-start md:pt-10 ">
          <img src="/offer1.jpg" alt="" className="max-w-70 md:pl-16 py-7" />
        </div>
        <Link href="/productDetails/sales/all" className="md:flex md:items-center relative  bottom-16 md:left-0 md:bottom-0 ">
                <button
                  className="bg-(--bg-color) text-xl text-(--main-color) px-8 py-2 rounded-lg font-medium transition-colors cursor-pointer "
                  >
                  العروض
                </button>
                </Link>
      
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-2">
          {filteredProducts.map((item: product) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="p-0 mb-2 flex flex-col justify-center rounded-lg border border-(--bg-color) shadow-lg hover:scale-95 transition-all duration-200 relative overflow-hidden w-full cursor-pointer px-3 bg-white"
            >
              {item.sale && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 shadow-lg z-10">
                  عرض
                </div>
              )}
              <div className="pb-0">
                <div className=" w-40 rounded-lg rounded-b-none mb-3 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="px-5 pt-0">
                <h3 className="text-[0.9rem] font-medium text-black ">
                  {item.name}
                </h3>
                <span className="text-[13px] text-black">{item.price} </span>
              </div>
              <div className="flex justify-center items-center mb-2 mt-2">
                <button className="bg-(--bg-color) text-white py-1 text-center transition-all duration-200 rounded-3xl px-3 cursor-pointer ">
                  اضف الي السله
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
     {isModalOpen && (
         <ProductPopp
         isOpen={isModalOpen}
         onClose={closeModal}
         product={selectedProduct}
         />
        )}
        </div>
  );
}

export default page;
