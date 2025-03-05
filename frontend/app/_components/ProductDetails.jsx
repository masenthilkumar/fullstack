// ProductDetails.js
'use client';
import React, { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { LoaderIcon, ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utilities/GlobalApi';
import { toast } from 'sonner';
import { UpdateCartContext } from '../_context/UpdateCartContext';

export default function ProductDetails({ product }) { // Destructure the product prop directly
  console.log(product.id);
  const jwt=sessionStorage.getItem('jwt'); //To get JWT token if session has value of logged-in user
  const user=JSON.parse(sessionStorage.getItem('user'));
  const [loader,setLoader]=useState();
  
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);

  const [ProductTotalPrice,setProductTotalPrice] = useState(
    product.sellingprice?
    product.sellingprice:
    product.mrp
  );

  const router=useRouter();
  const [Quantity,setQuantity] = useState(1);

  const addInCart=()=>{
    setLoader(true);
    if(!jwt){
      router.push('/sign-in');
      return;
    }
   
    const data={
      data:{
        quantity:Quantity,
        amount:(Quantity*ProductTotalPrice).toFixed(2),
        products:product.id-1,
        users_permissions_users:user.id,
        userid:user.id
      }      
    }
    console.log(data);
    
    GlobalApi.addToCart(data,jwt).then(resp=>{
      console.log(resp);
      toast('Added to Cart');
      setUpdateCart(!updateCart);
      setLoader(false);

    },(e)=>{
      toast('Error while adding into cart');
      setLoader(false);

    })
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      {/* Access properties directly using product.property */}
      {product.image && product.image.url ? ( // Check if image exists
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.image.url}
          alt={product.name || "Product image"}
          width={300}
          height={300}
          className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
        />
      ) : (
        <div className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg">
          No image available
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h2 className='text-2xl font-bold'>{product.name}</h2> {/* Correctly render the product name */}
        <h2 className="text-sm font-bold  text-slate-500">
          {product.description}
        </h2>
        {/* Add description if available */}
        {/* Add other product details here */}
        <div className="flex flex-col-2 gap-3">
          <h2 className="text-red-700 items-center font-bold text-3xl align-bottom">
            ${product.sellingprice}
          </h2>
          <h2 className="text-gray-600 line-through font-medium text-2xl">
            ${product.mrp}
          </h2>
        </div>
        <h2 className="font-semibold text-lg">Unit ({product.unittype})</h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className='flex gap-3 items-center'>
            <div className="p-2 border flex gap-10 items-center">
              <button disabled={Quantity == 1} onClick={() => setQuantity(Quantity - 1)}>-</button>
              <h2>{Quantity}</h2>
              <button onClick={() => setQuantity(Quantity + 1)}>+</button>
            </div>
            <h2 className='text-2xl font-bold'>=${(Quantity*ProductTotalPrice).toFixed(2)}</h2>
          </div>
          <Button variant="outline" onClick={()=>addInCart()} className="bg-transparent border-amber-950 bg-yellow-300 border-solid m-3">
            <ShoppingBasket />
            {loader?<LoaderIcon className='animate-spin'/> :'Add To Cart'}
          </Button>
        </div>
        <div className='grid grid-cols-2 flex flex-col items-baseline text-sm'>
          {product.categories &&
            product.categories.map((category, index) => (
              <h2 key={index} className='font-normal'><span className='font-bold'>Category: </span>  {category.name}</h2>
              
            ))}
        </div>    
      </div>
    </div>
  );
}

/*
<div className='flex flex-col gap-3'>
        <h2>{product.name}</h2>
        <p>{product.description}</p> 
        
        <p>Selling Price: ${product.sellingprice}</p>
        <p>MRP: ${product.mrp}</p>
        {product.categories && product.categories.map((category, index) => (
          <p key={index}>Category: {category.name}</p>
        ))}
      </div> 
*/
/*import React from 'react';

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
}*/
