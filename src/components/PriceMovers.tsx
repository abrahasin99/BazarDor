"use client";

import { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import { CaretDown, CaretUp } from "@gravity-ui/icons";

interface Product {
  id: string;
  nameBn: string;
  today: number;
  unit: string;
  category: string;
  categoryIcon?: React.ReactNode;
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

  const increasedProducts = products.filter(
    (product) => product.change.dir === "up"
  );

  const decreasedProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  const allProducts = products.slice(0, 33);

  const renderProducts = (items: Product[]) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <PriceCard
          key={product.id}
          nameBn={product.nameBn}
          today={product.today}
          unit={product.unit}
          categoryIcon={product.categoryIcon}
          change={product.change}
        />
      ))}
    </div>
  );

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 bg-[#f0f5f0]">

      {/* আজকে দাম বেড়েছে */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-1.5">
          <CaretUp
            width={18} height={18}
            className="text-red-500"
          />

          <h2 className="text-xl font-bold text-gray-900">
            আজকে দাম বেড়েছে
          </h2>
        </div>

        {renderProducts(increasedProducts)}
      </div>

      {/* আজকে দাম কমেছে */}
      <div className="mt-10 mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-1.5">
          <CaretDown
            width={18} height={18}
            className="text-green-600"
          />

          <h2 className="text-xl font-bold text-gray-900">
            আজকে দাম কমেছে
          </h2>
        </div>

        {renderProducts(decreasedProducts)}
      </div>

      {/* সব পণ্য */}
      <div className="mt-10 mx-auto max-w-7xl" id ="price-movers">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          সব পণ্য
        </h2>
        <p className="text-xs font-normal pb-4 text-gray-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>

        {renderProducts(allProducts)}
      </div>

    </section>
  );
}