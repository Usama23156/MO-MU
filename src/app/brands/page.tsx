'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { fetchBrands } from '@/store/brandsSlice'
import Link from 'next/link'

export default function Brands() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector(
    (state: RootState) => state.brands
  )

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 pt-32">
      {data.map(brand  => (
        <Link
            key={brand.id}
            href={`/categories/${brand.id}`}
            className="border rounded-lg p-4 text-center hover:shadow"
          >
            {brand.image && (
              <img
                src={brand.image}
                alt={brand.name}
                className="mx-auto mb-2 h-24 object-contain"
              />
            )}
            <p className="font-medium text-(--bg-color)">{brand.name}</p>
          </Link>
      ))}
    </div>
  )
}