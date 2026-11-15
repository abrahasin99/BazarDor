import CategoryBar from "@/components/CategoryBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceMarquee from "@/components/PriceMarquee";
import { Toaster } from "react-hot-toast";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <PriceMarquee />
      <main>{children}</main>
      <Toaster/>
      <Footer />
    </>
  );
}