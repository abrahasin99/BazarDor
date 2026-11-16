
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-400 sm:text-sm">
            ক্যাটাগরি লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-2 overflow-x-auto py-2.5 sm:gap-3 sm:py-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "bg-green-800 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
                }`}
              >
                <span className="text-sm sm:text-base">
                  {category.icon}
                </span>

                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
