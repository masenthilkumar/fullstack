'use client';
import React from 'react';
import Image from 'next/image';
import { LayoutGrid, LayoutGridIcon, LogInIcon, Search, ShoppingBagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import GlobalApi from '../_utilities/GlobalApi';
  import { useState, useEffect } from 'react';

function Header() {
    const [menuCategory, setMenuCategory] = React.useState([]);

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
    <div className="bg-yellow-300 flex p-4">
      <div>
        <Image
          src="/images/nesto-logo.png"
          alt=""
          width={180}
          height={500}
        ></Image>
      </div>
      <div className="p-1 px-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-4 items-center border rounded-full p-2 px-10 bg-yellow-600">
              <LayoutGrid className="h-5 w-5" />
              Categories
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuCategory.map((category, index) => (
                <DropdownMenuItem key={index}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url} alt='' width='20' height='20'></Image>
                    {category.name}
                    </DropdownMenuItem>
            ))}               
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='hidden md:flex gap-2 items-center'>
        <Search />
        <Input
          type="text"
          placeholder="Search for Products"
          className="border-2 border-yellow-600 rounded-lg p-2"
        />
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <h2 className="flex">
          <ShoppingBagIcon className="h-5 w-5" />0{" "}
        </h2>
        <Button className="bg-gradient-to-r from-yellow-600 to-yellow-900  border-yellow-900">
          <LogInIcon /> LogIn
        </Button>
      </div>
    </div>
  );
}

export default Header;
