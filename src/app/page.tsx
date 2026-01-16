"use client"
import React, { useEffect } from 'react'
import  Hero  from "@/_component/Hero/page";
import AOS from "aos"
import "aos/dist/aos.css"
import CategoriesSwaper from "@/_component/category swiper/page"
import SaleHome from "@/_component/sale home/page"
import Loading from "@/_component/loading/page"
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "@/store/brandsSlice"; // لو عندك slice للبراندات
import type { RootState, AppDispatch } from "@/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation , Pagination , Autoplay } from "swiper/modules";
import Link from "next/link";

export default function Home() {

   const dispatch = useDispatch<AppDispatch>();
  const { data: brands, loading } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

   useEffect(() => {
   const initAOS = async () => {
      await import("aos");
      AOS.init({
       duration : 1000,
       easing :'ease',
       once : true,
       anchorPlacement : 'top-bottom'
      });
   };
   initAOS();
 }, []);

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
    <>
    <div>
      <Hero/>
      <div className="px-6 md:px-20 py-10">
      <h2 className="text-2xl font-semibold mb-5 text-black">الشركات</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2} // عدد البراندات الظاهرة في نفس الوقت على الموبايل
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
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
      <img src="hero1.jpg" alt="" />
      <CategoriesSwaper/>
       <SaleHome />
    </div>
    </>
  );
}
