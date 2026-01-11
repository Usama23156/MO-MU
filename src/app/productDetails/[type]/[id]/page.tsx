"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductPopp from "@/_component/productPopp/page";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import { fetchCategories } from "@/store/categorySlice";
import { fetchBrands } from "@/store/brandsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { product } from "@/types/products";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaListUl, FaTags } from "react-icons/fa";
import Loading from "@/_component/loading/page"

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const { data: categories } = useSelector(
    (state: RootState) => state.categories
  );
  const { data: brands } = useSelector(
    (state: RootState) => state.brands
  );

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const params = useParams();
  const type = params.type as string;
  const id = params.id as string;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (item: any) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (type === "category") {
      return products.filter((p) => p.category_id.toString() === id);
    }

    if (type === "brand") {
      return products.filter((p) => p.brand_id?.toString() === id);
    }

    if (type === "sales") {
      return products.filter((p) => p.sale === true);
    }

    if (type === "all") {
      return products;
    }

    return [];
  }, [products, type, id]);
const isLoading =
  loading ;

if (isLoading) {
  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <Loading/>
    </div>
  );
}


  return (
    <div className="pt-29">
      <div className="fixed top-35 right-[-10] flex flex-col gap-3 z-50 ">
        <button
          onClick={() => {
            setShowCategories(!showCategories);
            setShowBrands(false);
          }}
          className="bg-(--bg-color) text-white p-3 rounded-l-full shadow-lg cursor-pointer"
        >
          <FaListUl size={20} />
        </button>

        <button
          onClick={() => {
            setShowBrands(!showBrands);
            setShowCategories(false);
          }}
          className="bg-(--bg-color) text-white p-3 rounded-l-full shadow-lg cursor-pointer"
        >
          <FaTags size={20} />
        </button>
      </div>
      {showCategories && (
        <div className="fixed inset-0 z-40 ">
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-100 border border-(--bg-color) p-4 overflow-y-auto pt-29 overflow-scroll">
            <h3 className="font-bold mb-4 text-(--bg-color)">Categories</h3>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/productDetails/all/all"
                  onClick={() => setShowCategories(false)}
                  className="text-black"
                >
                  All
                </Link>
              </li>

              <li>
                <Link
                  href="/productDetails/sales/all"
                  onClick={() => setShowCategories(false)}
                  className="text-black"
                >
                  Sales
                </Link>
              </li>

              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/productDetails/category/${category.id}`}
                    onClick={() => setShowCategories(false)}
                    className="text-black"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Brands Panel - Mobile */}
      {showBrands && (
        <div className="fixed inset-0 z-40 ">
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-100 border border-(--bg-color) p-4 overflow-y-auto pt-29">
            <h3 className="font-bold mb-4 text-(--bg-color)">Brands</h3>

            <ul className="flex flex-col gap-3">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/productDetails/brand/${brand.id}`}
                    onClick={() => setShowBrands(false)}
                    className="text-black"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* <div className="fixed right-0 bg-gray-100 mt-3 hidden md:block">
        <ul className=" overflow-scroll pt-11 h-53 text-center scroll-hidden">
          <h3 className="text-black bg-(--bg-color) w-45 font-bold fixed">
            Categories
          </h3>
          <li className="pt-6">
            {" "}
            <Link
              href="/productDetails/all/all"
              className="px-3 py-2 text-sm uppercase transition text-(--text-color)"
            >
              all
            </Link>
          </li>
          <li>
            <Link
              href="/productDetails/sales/all"
              className="px-3 py-2 text-sm uppercase transition text-(--text-color)"
            >
              Sales
            </Link>
          </li>
          {categories.map((category) => {
            const isActive =
              type === "category" && id === category.id.toString();
            return (
              <li key={category.id}>
                <Link
                  href={`/productDetails/category/${category.id.toString()}`}
                  className={`px-3 py-2 text-sm uppercase transition ${
                    isActive
                      ? "font-bold text-(--bg-color)"
                      : "text-(--text-color)"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="text-center">
          <h3 className="text-black fixed bg-(--bg-color) w-45 font-bold">
            Brands
          </h3>
        </div>
        <ul className=" overflow-scroll h-45 text-center pt-5 scroll-hidden">
          {brands.map((brand) => {
            const isActive = type === "brand" && id === brand.id.toString();
            return (
              <li key={brand.id}>
                <Link
                  href={`/productDetails/brand/${brand.id.toString()}`}
                  className={`px-3 py-2 text-sm uppercase transition ${
                    isActive
                      ? "font-bold text-(--bg-color)"
                      : "text-(--text-color)"
                  }`}
                >
                  {brand.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div> */}
      {/* Products Display */}
      <div className="row flex flex-col mt-10 mb-10 ">
        <div className="p-10 max-w-full ml-auto mr-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {
            filteredProducts.map((item: product) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="p-0 mb-2 flex flex-col justify-center rounded-lg border border-(--bg-color) shadow-lg hover:scale-95 transition-all duration-200 relative overflow-hidden w-full cursor-pointer px-3 "
              >
                {item.sale && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 shadow-lg z-10">
                    SALE
                  </div>
                )}
                <div className="pb-0">
                  <div className="aspect-square w-36 rounded-lg rounded-b-none mb-3 overflow-hidden flex items-center justify-center">
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
                  <span className="text-[13px] text-black">
                    {item.price} EGP
                  </span>
                </div>
                <div className="flex justify-center items-center mb-2 mt-2">
                  <button className="bg-(--bg-color) text-white py-1 text-center transition-all duration-200 rounded-3xl px-3 cursor-pointer">
                    Add to Basket
                  </button>
                </div>
              </div>
            ))
          
            }
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

export default Page; // Ensure the component is exported correctly
