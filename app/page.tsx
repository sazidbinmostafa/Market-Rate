import Hero from "@/components/Home/Hero";
import TopPriceGainingProducts from "@/components/Home/TopPriceGainingProducts";


export default function Home() {
  return (
    <div className="bg-[#CCCCCC] min-h-screen py-8 md:py-14 space-y-8">
      <Hero/>
      <TopPriceGainingProducts/>
    </div>
  );
}
