
"use client";

import { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import { CaretDown, CaretUp } from "@gravity-ui/icons";

interface Product {
  id: number;
  nameBn: string;
  today: number;
  unit: string;
  category: string;
  image: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function PriceSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  // Top 6 price increases
  const increasedProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 price decreases
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  // All products
  const allProducts = products.slice(0, 33);

  const renderProducts = (items: Product[]) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((product) => (
        <PriceCard
          key={product.id}
          productId={String(product.id)}
          nameBn={product.nameBn}
          today={product.today}
          unit={product.unit}
          image={product.image}
          change={product.change}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* আজকে দাম বেড়েছে */}
        <div>
          <div className="mb-4 flex items-center gap-2 sm:mb-5">
            <CaretUp
              width={18}
              height={18}
              className="shrink-0 text-red-500 sm:h-5 sm:w-5"
            />

            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              আজকে দাম বেড়েছে
            </h2>
          </div>

          {renderProducts(increasedProducts)}
        </div>

        {/* আজকে দাম কমেছে */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-center gap-2 sm:mb-5">
            <CaretDown
              width={18}
              height={18}
              className="shrink-0 text-green-600 sm:h-5 sm:w-5"
            />

            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              আজকে দাম কমেছে
            </h2>
          </div>

          {renderProducts(decreasedProducts)}
        </div>

        {/* সব পণ্য */}
        <div
          id="price-movers"
          className="mt-8 scroll-mt-6 sm:mt-10"
        >
          <h2 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
            সব পণ্য
          </h2>

          <p className="mb-4 text-xs font-normal text-gray-500 sm:text-sm">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>

          {renderProducts(allProducts)}
        </div>

      </div>
    </section>
  );
}
