"use client"; // مهم جداً عشان Swiper Client-side

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "@/store/brandsSlice"; // لو عندك slice للبراندات
import type { RootState, AppDispatch } from "@/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation , Pagination , Autoplay } from "swiper/modules";
import Link from "next/link";

export default function HomeBrandsSwiper() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: brands, loading } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-xl font-semibold mb-5 text-black">Our Brands</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2} // عدد البراندات الظاهرة في نفس الوقت على الموبايل
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        navigation
        // pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex justify-center">
            <div className="w-50 h-50 flex items-center justify-center p-2 border rounded-lg hover:shadow-md transition">
                <Link href={`/productDetails/brand/${brand.id.toString()}`}>

              <img
                src={brand.image??"/hero1.jpg"}
                alt={brand.name}
                className="object-contain w-full h-full"
                />
                </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}