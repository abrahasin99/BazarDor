import Link from "next/link";
import { CaretDown, CaretUp } from "@gravity-ui/icons";
import {
  toBanglaNumber,
  toBanglaUnit,
} from "@/app/Banglahelper";

interface PriceCardProps {
  productId: string;
  nameBn: string;
  today: number;
  unit: string;
  image: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function PriceCard({
  productId,
  nameBn,
  today,
  unit,
  image,
  change,
}: PriceCardProps) {
  return (
    <Link
      href={`/products/${productId}`}
      className="block"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        
        {/* Product Info */}
        <div className="flex items-start gap-3">
          
          {/* API image = emoji */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {image}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {nameBn}
            </h3>

            <p className="text-xs text-gray-500">
              প্রতি {toBanglaUnit(unit)}
            </p>
          </div>

        </div>

        {/* Price + Change */}
        <div className="mt-4 flex items-end justify-between">
          
          <div>
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="text-lg font-bold text-gray-900">
              ৳ {toBanglaNumber(today)}
            </p>
          </div>

          {/* Price increased */}
          {change.dir === "up" && (
            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
              <CaretUp width={14} height={14} />
              {toBanglaNumber(Math.abs(change.pct))}%
            </span>
          )}

          {/* Price decreased */}
          {change.dir === "down" && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
              <CaretDown width={14} height={14} />
              {toBanglaNumber(Math.abs(change.pct))}%
            </span>
          )}

        </div>
      </div>
    </Link>
  );
}