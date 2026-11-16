"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { CaretUp, CaretDown } from "@gravity-ui/icons";
import { toBanglaNumber, toBanglaUnit } from "../../src/app/Banglahelper";

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
          "https://openapi.programming-hero.com/api/bazardor/products",
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

  return (
    <div className="border-b border-gray-200 bg-white">
      <Marquee speed={65} pauseOnHover={true} gradient={false}>
        {products
          .filter((product) => product.change.dir !== "flat")
          .map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="mx-5 flex shrink-0 items-center gap-2 py-1 transition-opacity hover:opacity-70"
            >
              <span>{product.categoryIcon}</span>

              <span className="text-lg font-medium">{product.nameBn}</span>

              <span className="text-base font-normal">
                ৳ {toBanglaNumber(product.today)}/{toBanglaUnit(product.unit)}
              </span>

              {product.change.dir === "down" ? (
                <span className="flex items-center text-sm text-red-500">
                  <CaretDown width={16} height={16} />
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              ) : (
                <span className="flex items-center text-sm text-green-600">
                  <CaretUp width={16} height={16} />
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              )}

              <span className="text-gray-300">|</span>
            </Link>
          ))}
      </Marquee>
    </div>
  );
}
