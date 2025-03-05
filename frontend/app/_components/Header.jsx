'use client';
import React from 'react';
import Image from 'next/image';
import { CircleUserRound, LayoutGrid, LogInIcon, Search, ShoppingBasketIcon } from 'lucide-react';
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
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from './CartItemList';


function Header() {
    const [menuCategory, setMenuCategory] = React.useState([]);
    //const isLogin=sessionStorage.getItem('jwt')?true:false;
    const [isLogin, setIsLogin] = useState(false);
    //const user = JSON.parse(sessionStorage.getItem('user'));
    //const jwt = sessionStorage.getItem('jwt');
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [totalCartItem,setTotalCartItem]=useState(0);
    
    const {updateCart,setUpdateCart}=useContext(UpdateCartContext);
    const [cartItems, setCartItemList] = useState(); // Initialize as undefined
    
    const router=useRouter();

    const [isLoading, setIsLoading] = useState(true); // Add loading state


    useEffect(() => {
      if (user) { 

        // Fetch menu categories here
        //fetch(`/api/menu-categories?userId=${user.id}`).then(res => res.json()).then(data => setMenuCategory(data));
      }
    }, [user]); // Dependency on 'user'
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        // Ensure code only runs in the browser
        const storedUser = sessionStorage.getItem("user");
        const storedJwt = sessionStorage.getItem("jwt");
  
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedJwt) setJwt(storedJwt);
        setIsLogin(!!storedJwt);
      }
    }, []);
  

    /*useEffect(() => {
        getMenuCategory();
        const jwt = sessionStorage.getItem('jwt');
      setIsLogin(jwt ? true : false);
    },[]);*/
  
   /* useEffect(() => {
      getCartItems();
    },[updateCart]);*/

    const getMenuCategory = () => {
        GlobalApi.getMenuCategory().then((response) => {
            console.log('List', response.data.data);
            setMenuCategory(response.data.data);
        });
        
    };    

    useEffect(() => {
      const fetchCartItems = async () => {
        if (user) {
          setIsLoading(true); // Set loading state before fetching
          try {
            const cartItems = await GlobalApi.getCartItems(user.id, jwt);
            //const response = await GlobalApi.getCartItems(user.id, jwt); // Replace with your actual API endpoint
           // const data = await response.json();
            //console.log('Fetched cart items:', data); // Log the fetched data
            //setCartitems(data); // Update the state
            console.log('Updated cartitems:', cartItems); // Log the updated state (might still be undefined due to async)
            setCartItemList(cartItems);
            setTotalCartItem(cartItems?.length || 0); // Use optional chaining
          } catch (error) {
            //console.error('Error fetching cart items:', error);
              console.error('Error fetching cart items:', error.message, error.stack); // Log both message and stack
            // Handle the error (e.g., display an error message)
          } finally {
            setIsLoading(false); // Reset loading state after fetching
          }
        } else {
          // ... handle case where user is null ...
        }
      };
  
      fetchCartItems();
    }, [user, updateCart]);
  /*
    useEffect(() => {
      // This will log the updated cartitems after the state has been updated
      console.log('Cartitems in useEffect:', cartItems);
    }, [cartItems]); // Run whenever cartitems changes

    useEffect(() => {
      console.log('Total cart items:', totalCartItem); // Log updated cart count
    }, [totalCartItem]); */
  
/*
    const getCartItems=async()=>{
      if (user) {
        // Access user.id here
        const userId = user.id;
        // ... rest of your code ...
        const cartItemList=await GlobalApi.getCartItems(userId,jwt);
      console.log(cartItemList);
      setTotalCartItem(cartItemList?.length);
      setCartItemList(cartItemList);  
      console.log('totatl cart item'+totalCartItem);
      } else {
        // Handle the case where user is null (e.g., return early, show a message)
        console.log("User is not logged in or data is not loaded.");
        return; // Or perform other actions
      }
      
    }*/

    const onSignOut=()=>{
      sessionStorage.clear();
      router.push('/sign-in');
    }


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
              <Link key={index} href={'/product-category/'+category.name}>
                <DropdownMenuItem>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url} alt='' width='20' height='20'></Image>
                    {category.name}
                    </DropdownMenuItem>
              </Link>      
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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasketIcon/>
              <span className='bg-white  text-slate-900 font-bold px-2 rounded-full'> {totalCartItem} </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-yellow-300 text-amber-950 font-bold text-lg p-2"> My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItems={cartItems}/>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isLogin? <Link href={'/sign-in'}>
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-900  border-yellow-900">
              <LogInIcon /> LogIn
            </Button>
          </Link>
          :
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound className='bg-white text-amber-900 rounded-full cursor-pointer p-1 h-10 w-10'/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Order</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            
        } 
      </div>
    </div>
  );
}

export default Header;
