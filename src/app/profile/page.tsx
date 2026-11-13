"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient, useSession, signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const {
    data: session,
    isPending,
    refetch,
  } = useSession();

  const [name, setName] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f8f4] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 h-32 animate-pulse rounded-2xl bg-white" />
          <div className="mt-5 h-56 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f8f4]">
        <p className="text-gray-600">আপনাকে প্রথমে সাইন ইন করতে হবে।</p>
      </main>
    );
  }

  const user = session.user;

  const displayName = name || user.name || "";
  const firstLetter = displayName.charAt(0).toUpperCase();

  const handleUpdate = async () => {
    const newName = name.trim();

    if (!newName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (newName === user.name) {
      toast.success("কোনো পরিবর্তন করা হয়নি");
      return;
    }

    const { error } = await authClient.updateUser({
      name: newName,
    });

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
      return;
    }

    await refetch();
    toast.success("প্রোফাইল আপডেট হয়েছে");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং আপডেট করুন।
          </p>
        </div>

        {/* Profile card */}
        <section className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* User */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gray-100">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-gray-600">
                    {firstLetter}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Sign out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>সাইন আউট</span>
            </button>
          </div>
        </section>

        {/* Information */}
        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-gray-900">তথ্য</h2>

          <div className="mt-8">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
              />
            </div>

            {/* Update button */}
            <button
              type="button"
              onClick={handleUpdate}
              className="mt-6 w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              আপডেট
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
