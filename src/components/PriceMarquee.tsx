"use client";

import { ReactNode, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { CaretUp, CaretDown } from "@gravity-ui/icons";
import { toBanglaNumber, toBanglaUnit } from "../../src/app/Banglahelper";

interface Product {
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  categoryIcon: ReactNode;
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

        const data = await response.json();
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

  return (
    <div className="border-b border-gray-200 bg-white">
      <Marquee
        speed={65}
        pauseOnHover={true}
        gradient={false}
      >
        {products
          .filter((product) => product.change.dir !== "flat")
          .map((product) => (
            <div
              key={product.id}
              className="mx-5 flex shrink-0 items-center gap-2 py-1"
            >
              <span>{product.categoryIcon}</span>

              <span className="font-medium text-lg">{product.nameBn}</span>

              <span className="font-normal text-base">
                ৳ {toBanglaNumber(product.today)}/
                {toBanglaUnit(product.unit)}
              </span>

              {product.change.dir === "down" ? (
                <span className="flex items-center text-red-500 text-sm">
                  <CaretDown />
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              ) : (
                <span className="flex items-center text-green-600 text-sm">
                  <CaretUp />
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              )}

              <span className="text-gray-300">|</span>
            </div>
          ))}
      </Marquee>
    </div>
  );
}