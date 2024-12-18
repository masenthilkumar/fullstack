import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
function Slider() {
  return (
    <div className="banner min-w-10">
      <Carousel>
        <CarouselContent className="">
          <CarouselItem>
            <div className="flex">
              <div className="px-10 gap-10">
                <Badge
                  variant="outline"
                  className="sm:hidden md:hidden lg:inline-block m-3 text-white"
                >
                  Get 20% Discount
                </Badge>
                <h1 className="ext sm md:text base lg:text-5xl md:text-1xl font-bold py-6 text-white">
                  All Your Daily Needs
                </h1>
                <p className="ext sm md:text base lg:text-3xl md:text-1xl font-bold py-6 text-white">
                  Get All your daily needs at one place
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white border-solid m-3"
                  size="lg"
                >
                  <ShoppingBasket /> Buy Now
                </Button>
              </div>
              <div className='flex'>
                <Image
                  src="/images/slider-banner1.png"
                  className="w-full h [300px] md:h [300px] object-cover rounded-2xl row-span-1 m-2 align-middle"
                  alt=""
                  width="200"
                  height="200"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem><div className="flex">
              <div className="px-10 gap-10">
                <Badge
                  variant="outline"
                  className="sm:hidden md:hidden lg:inline-block m-3 text-white"
                >
                  Get 20% Discount
                </Badge>
                <h1 className="ext sm md:text base lg:text-5xl md:text-1xl font-bold py-6 text-white">
                  All Your Daily Needs
                </h1>
                <p className="ext sm md:text base lg:text-3xl md:text-1xl font-bold py-6 text-white">
                  Get All your daily needs at one place
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white border-solid m-3"
                  size="lg"
                >
                  <ShoppingBasket /> Buy Now
                </Button>
              </div>
              <div className='flex'>
                <Image
                  src="/images/slider-banner2.png"
                  className="w-full h [300px] md:h [300px] object-cover rounded-2xl row-span-1 m-2 align-middle"
                  alt=""
                  width="300"
                  height="200"
                />
              </div>
            </div></CarouselItem>
          <CarouselItem><div className="flex">
              <div className="px-10 gap-10">
                <Badge
                  variant="outline"
                  className="sm:hidden md:hidden lg:inline-block m-3 text-white"
                >
                  Get 20% Discount
                </Badge>
                <h1 className="ext sm md:text base lg:text-5xl md:text-1xl font-bold py-6 text-white">
                  All Your Daily Needs
                </h1>
                <p className="ext sm md:text base lg:text-3xl md:text-1xl font-bold py-6 text-white">
                  Get All your daily needs at one place
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white border-solid m-3"
                  size="lg"
                >
                  <ShoppingBasket /> Buy Now
                </Button>
              </div>
              <div className='flex'>
                <Image
                  src="/images/slider-banner3.png"
                  className="w-full h [300px] md:h [300px] object-cover rounded-2xl row-span-1 m-2 align-middle"
                  alt=""
                  width="300"
                  height="200"
                />
              </div>
            </div></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Slider
