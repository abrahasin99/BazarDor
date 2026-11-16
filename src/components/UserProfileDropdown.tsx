
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isPending || !session?.user) {
    return null;
  }

  const user = session.user;
  const firstName = user.name?.split(" ")[0] || "User";

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি!");
        return;
      }

      setIsOpen(false);

      toast.success("সফলভাবে লগ আউট করেছেন!", {
        duration: 4000,
      });
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-gray-100"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Profile"}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-600">
              {firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <span className="text-sm font-medium text-gray-800">
          {firstName}
        </span>

        <ChevronDown
          size={15}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 px-4 py-4">
            <p className="text-sm font-semibold text-gray-900">
              {user.name}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={17} />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut size={17} />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
