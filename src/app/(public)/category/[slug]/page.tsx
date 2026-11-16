"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import PriceCard from "@/components/PriceCard";
import { toBanglaNumber } from "@/app/Banglahelper";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number | string;
  yesterday: number | string;
  lastWeek: number | string;
  lastMonth: number | string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function bengaliToNumber(value: number | string): number {
  if (typeof value === "number") {
    return value;
  }

  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  const englishValue = value
    .replace(/[০-৯]/g, (digit) => {
      return String(bengaliDigits.indexOf(digit));
    })
    .replace(/,/g, "");

  return Number(englishValue);
}

export default function CategoryPage({
  params,
}: PageProps) {
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const getParams = async () => {
      const { slug } = await params;
      setSlug(slug);
    };

    getParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`
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
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = bengaliToNumber(a.today);
    const priceB = bengaliToNumber(b.today);

    if (sortOption === "low-to-high") {
      return priceA - priceB;
    }

    if (sortOption === "high-to-low") {
      return priceB - priceA;
    }

    return 0;
  });

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">
            পণ্য লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  const categoryName = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">

      {/* Category Header */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {categoryName}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              আজকের {categoryName} এর বাজার দর
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-5">

        {/* Products Header + Sort */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-700">
            মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-xs font-medium text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="default">
                ডিফল্ট
              </option>

              <option value="low-to-high">
                দাম: কম থেকে বেশি
              </option>

              <option value="high-to-low">
                দাম: বেশি থেকে কম
              </option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <PriceCard
              key={product.id}
              productId={String(product.id)}
              nameBn={product.nameBn}
              today={bengaliToNumber(product.today)}
              unit={product.unit}
              image={product.image}
              change={product.change}
            />
          ))}
        </div>

      </section>
    </main>
  );
}