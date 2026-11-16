
"use client";

import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import BazarHero from "../../assets/bazar-hero.png";

export default function Hero() {
  return (
    <section className="bg-[#f0f5f0] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-2xl border border-green-100 bg-white px-5 py-6 shadow-sm sm:gap-8 sm:rounded-3xl sm:px-8 sm:py-8 md:px-10 lg:min-h-[300px] lg:flex-row lg:justify-between lg:gap-6 lg:px-12 lg:py-10">
        {/* Left content */}
        <div className="w-full max-w-2xl">
          {/* Date */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-700 sm:px-4 sm:text-sm">
            <CalendarDays size={15} className="shrink-0 sm:h-4 sm:w-4" />
            <span>শনিবার, ১৫ নভেম্বর, ২০২৬</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:mt-5 sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={() => {
              document.getElementById("price-movers")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700 sm:mt-6 sm:px-5 sm:py-3 sm:text-sm"
          >
            <span>সব পণ্য দেখুন</span>
            <ArrowRight size={16} className="sm:h-[17px] sm:w-[17px]" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative h-40 w-full max-w-[260px] shrink-0 sm:h-52 sm:max-w-[320px] md:h-60 md:max-w-[360px] lg:h-[280px] lg:w-[360px]">
          <Image
            src={BazarHero}
            alt="বাজারের বিভিন্ন পণ্য"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
          />
        </div>
      </div>
    </section>
  );
}
