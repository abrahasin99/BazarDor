"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../assets/logo-icon.png";
import Link from "next/link";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import { authClient } from "@/lib/auth-client";

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

  return (
    <div className="flex gap-2 items-center justify-between p-4 px-30">
      {/* Logo + Website Info */}
      <div className="flex gap-2">
        <Link href={"/"}>
          <div className="bg-green-600 rounded-2xl w-12 h-12 flex items-center justify-center shrink-0">
            <Image
              src={Logo}
              alt="Logo of Website"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
        </Link>

        <div>
          <Link href={"/"}>
            <h1 className="text-xl font-black">বাজার দর</h1>
          </Link>

          <Link href={"/"}>
            <p className="text-sm font-normal">{banglaDate}</p>
          </Link>
        </div>
      </div>

      {/* Authentication Buttons */}
      <div className="flex gap-4 items-center">
        {!isPending && !session && (
          <>
            <Link href={"/sign-in"}>
              <button className="cursor-pointer">
                সাইন ইন
              </button>
            </Link>

            <Link href={"/sign-up"}>
              <button className="btn bg-green-700 shadow-lg shadow-green-500/40 text-white border-none">
                সাইন আপ
              </button>
            </Link>
          </>
        )}

        {!isPending && session && <UserProfileDropdown />}
      </div>
    </div>
  );
};

export default Navbar;