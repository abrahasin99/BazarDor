
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

export default function CategoryPage({ params }: PageProps) {
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
        setProducts([]);
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
      <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center sm:rounded-2xl sm:p-8">
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
    <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

      {/* Category Header */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl sm:h-12 sm:w-12 sm:text-2xl">
            {categoryIcon}
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-base font-bold text-gray-900 sm:text-lg">
              {categoryName || "পণ্য পাওয়া যায়নি"}
            </h1>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              আজকের {categoryName} এর বাজার দর
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-5">

        {/* Products Header + Sort */}
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs font-medium text-gray-700 sm:text-sm">
            মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="relative w-full sm:w-auto">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              aria-label="পণ্যের দাম অনুযায়ী সাজান"
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-xs font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-auto sm:min-w-[170px]"
            >
              <option value="default">ডিফল্ট</option>

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
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center sm:rounded-2xl">
            <p className="text-sm text-gray-500">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}

      </section>
    </main>
  );
}
