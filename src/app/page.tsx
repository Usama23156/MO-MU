"use client"
import React, { useEffect } from 'react'
import  Hero  from "@/_component/Hero/page";
import Offers from "@/_component/offers/page";
import AOS from "aos"
import "aos/dist/aos.css"


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
      <Offers/>
    </div>
    </>
  );
}
