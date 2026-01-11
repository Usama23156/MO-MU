"use client"
import React, { useEffect } from 'react'
import  Hero  from "@/_component/Hero/page";
import AOS from "aos"
import "aos/dist/aos.css"
import BrandSwaper from "@/_component/brand swiper/page"
import CategoriesSwaper from "@/_component/category swiper/page"
import SaleHome from "@/_component/sale home/page"


export default function Home() {
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
 
  return (
    <>
    <div>
      <Hero/>
      <BrandSwaper/>
      <img src="hero1.jpg" alt="" />
      <CategoriesSwaper/>
       <SaleHome />
    </div>
    </>
  );
}
