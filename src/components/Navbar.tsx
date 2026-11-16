
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../assets/logo-icon.png";
import Link from "next/link";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  calendar: "gregory",
  timeZone: "Asia/Dhaka",
}).format(new Date());

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("login") === "success") {
      toast.success("সফলভাবে সাইন ইন করেছেন!", {
        duration: 4000,
      });

      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("login");

      window.history.replaceState(
        {},
        "",
        cleanUrl.pathname +
          (cleanUrl.search ? `?${cleanUrl.searchParams.toString()}` : "") +
          cleanUrl.hash
      );
    }
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        {/* Logo + Website Info */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" className="shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 sm:h-12 sm:w-12 sm:rounded-2xl">
              <Image
                src={Logo}
                alt="Logo of Website"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </Link>

          <div className="min-w-0">
            <Link href="/">
              <h1 className="text-lg font-black leading-tight sm:text-xl">
                বাজার দর
              </h1>
            </Link>

            <Link href="/">
              <p className="truncate text-xs font-normal text-gray-600 sm:text-sm">
                {banglaDate}
              </p>
            </Link>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          {!isPending && !session && (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-2 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg border-none bg-green-700 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-800 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}

          {!isPending && session && <UserProfileDropdown />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
