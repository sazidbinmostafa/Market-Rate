import AllProducts from "@/components/Home/AllProducts";
import Hero from "@/components/Home/Hero";
import TopPriceGainingProducts from "@/components/Home/TopPriceGainingProducts";
import TopPriceLosingProducts from "@/components/Home/TopPriceLosingProducts";


export default function Home() {
  return (
    <div className="bg-[#CCCCCC] min-h-screen py-8 md:py-14 space-y-8 px-3">
      <Hero/>
      <TopPriceGainingProducts/>
      <TopPriceLosingProducts />
      <AllProducts />
    </div>
  );
}
