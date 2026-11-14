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
      <div className="mx-auto max-w-7xl px-4 py-2.5">
        <p className="text-center text-sm text-gray-400">
          ক্যাটাগরি লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-7 overflow-x-auto py-2.5">
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-1 py-1 text-xs font-medium transition ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}