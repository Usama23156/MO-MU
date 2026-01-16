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