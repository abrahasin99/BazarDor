
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="mb-4 text-6xl font-bold text-green-600 sm:mb-6 sm:text-7xl">
          ৪০৪
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          অথবা ঠিকানাটি ভুল।
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Home size={17} />
            হোমে যান
          </Link>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
