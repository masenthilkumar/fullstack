'use client';
import React from 'react';
import GlobalApi from '../_utilities/GlobalApi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';

function CategoryList() {
    const [categorylist, setMenuCategory] = React.useState([]);
  
      useEffect(() => {
        getMenuCategory();
      },[]);
  
      const getMenuCategory = () => {
          GlobalApi.getMenuCategory().then((response) => {
              console.log('List', response.data.data);
              setMenuCategory(response.data.data);
          });
    };    
    return (
    <div>
      <div>
        Product List
        <div className='m-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-5 items-center justify-between'>
          
            {categorylist.map((category, index) => (
                <div key={index} className='flex flex-col items-center rounded-lg gap-2 group cursor-pointer hover:bg-yellow-500 bg-yellow-300 hover:scale-125 transition-all ease-in-out duration-500'>                  
                    <Image src={'/images/'+category.name}alt='' width='20' height='20'></Image>
                    <h2 className='flex text-orange-700 items-center'>{category.name}</h2>
                </div>
                
            ))}         
            
        </div>
      </div>
    </div>
  )
}

export default CategoryList
