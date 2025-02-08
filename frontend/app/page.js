import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Slider from "./_components/Slider";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <div>
      <Slider/>
      <CategoryList/>
      <ProductList/>
      <Footer />
  </div>
  );
}
console.log(process.env.NEXT_PUBLIC_IMAGE_URL);
