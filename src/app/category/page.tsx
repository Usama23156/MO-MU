'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { fetchCategories } from '@/store/categorySlice'
import Link from 'next/link'
import Loading from "@/_component/loading/page"



export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector(
    (state: RootState) => state.categories
  )

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

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
    // <div className="pt-36 relative">
    //   <img src="/shop-car.png" alt="" className=' fixed lg:left-24 max-w-52 z-50'/>

    //   <div className="grid  gap-4">
    //     {data.map(category => (
    //       <Link
    //         key={category.id}
    //         href={`/productDetails/category/${category.id}`}
    //         className="border rounded-lg p-4 text-center hover:shadow pl-20 md:pl-72"
    //       >
    //         <div className='justify-center items-center flex ' data-aos="fade-up">
    //         <img
    //             src="/elsahm.jpg"
    //             alt=""
    //             className="w-20 h-20 "
    //           />
    //         {category.image && (
    //           <img
    //             src={category.image}
    //             alt={category.name}
    //             className="mx-auto mb-2 h-24 object-contain rounded-2xl bg-amber-500 relative left-0"
    //           />
    //         )} 
    //         </div>
    //         <p className="font-medium text-(--bg-color) pl-14" data-aos="fade-up">{category.name}</p>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 pt-32 pb-10">
          {data.map(category  => (
            <Link
            
                key={category.id}
                href={`/productDetails/category/${category.id}`}
                className="border rounded-lg p-4 text-center hover:shadow border-(--bg-color) "
                
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto mb-2 h-24 object-contain"
                  />
                )}
                <p className="font-medium text-(--bg-color)">{category.name}</p>
              </Link>
          ))}
        </div>
  )
}