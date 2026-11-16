
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
      className="block h-full min-w-0"
    >
      <div className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl sm:p-4">
        {/* Product Info */}
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
          {/* API image = emoji */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xl sm:h-10 sm:w-10 sm:rounded-xl sm:text-2xl">
            {image}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-sm font-semibold leading-5 text-gray-800 sm:text-base">
              {nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {toBanglaUnit(unit)}
            </p>
          </div>
        </div>

        {/* Price + Change */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-2 sm:mt-5">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-0.5 break-words text-base font-bold text-gray-900 sm:text-lg">
              ৳ {toBanglaNumber(today)}
            </p>
          </div>

          {/* Price increased */}
          {change.dir === "up" && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600 sm:px-2.5">
              <CaretUp width={14} height={14} />
              {toBanglaNumber(Math.abs(change.pct))}%
            </span>
          )}

          {/* Price decreased */}
          {change.dir === "down" && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600 sm:px-2.5">
              <CaretDown width={14} height={14} />
              {toBanglaNumber(Math.abs(change.pct))}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
