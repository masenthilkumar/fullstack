import React from 'react';

export default function ProductDetails(product) {
  return (

    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
        {product.name}
        {product?.attributes?.images?.data?.length > 0 ? (
        <img
            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes.images.data[0].attributes.url}
            alt={product.attributes.images.data[0].attributes.alternativeText || 'Product image'}
            width={300}
            height={300}
            className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
        />
        ) : (
        <div  className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'>No image available</div> // Or you can show a placeholder
        )}
        <div className='flex flex-col gap-3'>
            <h2>{product.name}</h2>
        </div>
    </div>

  )
}
