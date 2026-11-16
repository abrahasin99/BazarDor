
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { CaretUp, CaretDown } from "@gravity-ui/icons";
import { toBanglaNumber, toBanglaUnit } from "@/app/Banglahelper";

interface Product {
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  categoryIcon: string;
  id: string;
  nameBn: string;
  today: number;
  unit: string;
  category: string;
}

export default function PriceMarquee() {
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
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  const changingProducts = products.filter(
    (product) => product.change.dir !== "flat"
  );

  if (changingProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-white">
      <Marquee
        speed={55}
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={false}
        autoFill={true}
      >
        {changingProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="mx-3 flex shrink-0 items-center gap-1.5 py-2 transition-opacity hover:opacity-70 sm:mx-5 sm:gap-2 sm:py-2.5"
          >
            <span className="text-sm sm:text-base">
              {product.categoryIcon}
            </span>

            <span className="text-xs font-medium text-gray-800 sm:text-sm">
              {product.nameBn}
            </span>

            <span className="text-xs font-normal text-gray-600 sm:text-sm">
              ৳ {toBanglaNumber(product.today)}/
              {toBanglaUnit(product.unit)}
            </span>

            {product.change.dir === "up" ? (
              <span className="flex shrink-0 items-center text-xs text-red-500 sm:text-sm">
                <CaretUp width={14} height={14} />
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </span>
            ) : (
              <span className="flex shrink-0 items-center text-xs text-green-600 sm:text-sm">
                <CaretDown width={14} height={14} />
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </span>
            )}

            <span className="ml-2 text-gray-300 sm:ml-3">|</span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
