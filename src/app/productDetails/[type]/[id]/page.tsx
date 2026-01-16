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
import Loading from "@/_component/loading/page";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: categories } = useSelector(
    (state: RootState) => state.categories
  );
  const { data: brands } = useSelector((state: RootState) => state.brands);

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        <Loading />
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
        <div className="fixed inset-0 z-40 mt-31">
          <div
            className="absolute right-0 top-0 lg:h-78 h-[80%] w-64 bg-gray-100 border border-(--bg-color) p-4 overflow-y-auto pt-5 overflow-scroll scroll-hidden"
            data-aos="flip-right"
          >
            <ul className="flex flex-col gap-3 mr-9">
            <h3 className="font-bold mb-1 text-(--bg-color)">الاقسام</h3>
              <li>
                <Link
                  href="/productDetails/all/all"
                  onClick={() => setShowCategories(false)}
                  className="text-black hover:text-(--bg-color) font-medium"
                >
                  الكل
                </Link>
              </li>

              <li>
                <Link
                  href="/productDetails/sales/all"
                  onClick={() => setShowCategories(false)}
                  className="text-black hover:text-(--bg-color) font-medium"
                >
                  العروض
                </Link>
              </li>

              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/productDetails/category/${category.id}`}
                    onClick={() => setShowCategories(false)}
                    className="text-black hover:text-(--bg-color) font-medium"
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
        <div className="fixed inset-0 z-40 mt-31">
          <div
            className="absolute right-0 top-0 lg:h-78 h-[80%] w-64 bg-gray-100 border border-(--bg-color) p-4 overflow-y-auto pt-5 scroll-hidden "
            data-aos="flip-right"
          >

            <ul className="flex flex-col gap-3 mr-9">
            <h3 className="font-bold mb-1 text-(--bg-color)">الشركات</h3>
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/productDetails/brand/${brand.id}`}
                    onClick={() => setShowBrands(false)}
                    className="text-black hover:text-(--bg-color) font-medium"
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
        <div className="p-5 max-w-full ml-auto mr-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {paginatedProducts.map((item: product) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="p-0 mb-2 flex flex-col justify-center rounded-lg border border-(--bg-color) shadow-lg hover:scale-95 transition-all duration-200 relative overflow-hidden w-full cursor-pointer px-3 "
            >
              {item.sale && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 shadow-lg z-10">
                 عرض
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
                <h3 className="text-[0.9rem] font-medium text-black h-10">
                  {item.name}
                </h3>
                <span className="text-[13px] text-black">{item.price} </span>
              </div>
              <div className="flex justify-center items-center mb-2 mt-2 bottom-0 relative">
                <button className="bg-(--bg-color) text-white py-1 text-center transition-all duration-200 rounded-3xl px-3 cursor-pointer">
                  اضف الي السله
                </button>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded border text-(--bg-color) cursor-pointer"
            >
              السابق
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-(--bg-color) text-white"
                    : "bg-white text-(--bg-color) cursor-pointer"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded border disabled:opacity-40 text-(--bg-color) cursor-pointer"
            >
              التالي
            </button>
          </div>
        )}
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
