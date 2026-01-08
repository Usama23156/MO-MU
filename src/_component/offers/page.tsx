import React from 'react'
import { Offer } from '@/data/data'

function page() {
  return (
    <div className='p-9'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
            {
                Offer.map((offer)=>{
                    return(
                        <div key={offer.id} className='border p-4 rounded-lg shadow-lg'>
                            <img src={offer.img} alt={`Offer ${offer.id}`} className='w-full h-auto rounded-md'/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default page