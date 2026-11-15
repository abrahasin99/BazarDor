"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import BazarHero from "../../assets/bazar-hero.png";

export default function Hero() {
  return (
    <section className="bg-[#f0f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-3xl border border-green-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10 lg:min-h-[300px] lg:px-12">
        {/* Left content */}
        <div className="max-w-2xl">
          {/* Date */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-700 sm:text-sm">
            <CalendarDays size={16} />
            <span>শনিবার, ১৫ নভেম্বর, ২০২৬</span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
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
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <span>সব পণ্য দেখুন</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative hidden h-[250px] w-[300px] shrink-0 sm:block lg:h-[280px] lg:w-[360px]">
          <Image
            src={BazarHero}
            alt="বাজারের বিভিন্ন পণ্য"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1024px) 300px, 360px"
          />
        </div>
      </div>
    </section>
  );
}
