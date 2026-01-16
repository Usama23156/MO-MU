"use client"; // مهم جداً عشان Swiper Client-side

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/store/categorySlice"; // لو عندك slice للبراندات
import type { RootState, AppDispatch } from "@/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation , Pagination , Autoplay } from "swiper/modules";
import Link from "next/link";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-xl font-semibold mb-5 text-black">الاقسام</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={60}
        slidesPerView={2} // عدد البراندات الظاهرة في نفس الوقت على الموبايل
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        navigation
        // pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="flex justify-center">
            <div className="w-50 h-50 flex items-center justify-center p-2 border rounded-lg hover:shadow-md transition ">
                <Link href={`/productDetails/category/${category.id.toString()}`}>

              <img
                src={category.image??"/hero1.jpg"}
                alt={category.name}
                className="object-contain w-full h-40"
                />
                <p className="text-center text-(--bg-color)">{category.name}</p>
                </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}