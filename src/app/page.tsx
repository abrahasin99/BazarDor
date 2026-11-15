import CategoryBar from "@/components/CategoryBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PriceMarquee from "@/components/PriceMarquee";
import PriceMovers from "@/components/PriceMovers";

export default function HomePage() {
  return (
    <>
      <Navbar/>
      <CategoryBar/>
      <PriceMarquee/>
      <Hero />
      <PriceMovers />
      <Footer/>
    </>
  );
}
