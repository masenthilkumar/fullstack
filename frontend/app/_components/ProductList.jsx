'use client';
import React from 'react';
import GlobalApi from '../_utilities/GlobalApi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bookmark, Heart, Link, ShoppingBagIcon, ShoppingBasketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetails from './ProductDetails';



function ProductList() {
    const [productlist, setProductList] = React.useState([]);
    
          useEffect(() => {
            getProductList();
          },[]);
      
          const getProductList = () => {
              GlobalApi.getProductList().then((response) => {
                  console.log('Product List', response.data.data);
                  setProductList(response.data.data);
              });
        };    

  return (
    <div className='grid grid-cols-4 gap-4 p-5'>    
                
                  {productlist.map((product, index) => (
                      <div key={index} className='p-3 flex flex-col items-center rounded-lg gap-4 border border-yellow-300 cursor-pointer hover:scale-110 transition-all ease-in-out duration-500'>                  
                          
                          <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.image.url} alt='' width='128' height='128' className='h-[128] w-[128]'></Image>
                         <h2 className='flex text-orange-700 items-center font-bold font-serif text-orange-900 text-pretty'>{product.name}</h2>
                         <div className='grid grid-cols-2 gap-4'>
                            <div className='flex text-red-700 items-center font-bold text-2xl align-bottom'>$ {product.sellingprice}</div>
                            <div className='flex text-gray-600 line-through font-medium'>$ {product.mrp}</div>                            
                         </div>
                         <div> 
                            {product.categories.map((category, CatIndex) => (
                              <h2 key={CatIndex}>{category.name}</h2>
                            ))}
                        </div> 
                        <div className='flex flex-col-3 align-middle'>
                          <Button variant="outline" className=' '>
                            <Bookmark color='black'/>
                          </Button>
                          
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="bg-transparent border-amber-950 bg-yellow-300 border-solid m-3">
                                  <ShoppingBasketIcon /> Add To Cart 
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle> </DialogTitle>
                                  <DialogDescription>
                                  <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
                                     
                                      <img
                                          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.image.url}
                                          alt="image"
                                          width={300}
                                          height={300}
                                          className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
                                      />
                                      
                                      <div className='flex flex-col gap-3'>
                                          <h2 className='text-2xl font-bold'>{product.name}</h2>
                                          <h2 className='text-sm font-bold  text-slate-500'>{product.description}</h2>
                                          <div className='flex flex-col-2 gap-3'>
                                            <h2 className='text-red-700 items-center font-bold text-3xl align-bottom'>${product.sellingprice}</h2>
                                            <h2 className='text-gray-600 line-through font-medium text-2xl'>${product.mrp}</h2>
                                          </div>
                                          <h2 className='font-semibold text-lg'>Unit ({product.unittype})</h2>
                                          
                                          <div className='flex flex-col items-baseline gap-3'>
                                            <div className='p-2 border flex gap-10 items-center'>
                                              <button>-</button>
                                              <h2>1</h2>
                                              <button>+</button>
                                            </div>
                                            <Button variant='outline' className='bg-transparent border-amber-950 bg-yellow-300 border-solid m-3'>
                                              <ShoppingBasket />
                                              Buy Now  
                                            </Button>
                                          </div>
                                          <div className='grid grid-cols-2 flex flex-col items-baseline text-sm'>
                                            <span className='font-bold'>Category: </span>
                                            {product.categories.map((category, CatIndex) => (
                                              <h2 key={CatIndex}>{category.name}</h2>
                                            ))}
                                          </div>
                                          
                                      </div>
                                      
                                  </div>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <Button variant="outline">
                            <Heart color='red'/>
                          </Button>
                        </div>

                      </div>
                  ))}         
                  
              </div>
    
  )
}

export default ProductList;

