
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient, useSession, signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f8f4] px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 max-w-full animate-pulse rounded bg-gray-200" />

          <div className="mt-6 h-32 animate-pulse rounded-2xl bg-white sm:mt-8" />
          <div className="mt-4 h-56 animate-pulse rounded-2xl bg-white sm:mt-5" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f3f8f4] px-4 py-10">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          আপনাকে প্রথমে সাইন ইন করতে হবে।
        </p>
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

    try {
      setIsUpdating(true);

      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      await refetch();
      toast.success("প্রোফাইল আপডেট হয়েছে");
    } catch {
      toast.error("প্রোফাইল আপডেট করা যায়নি");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং আপডেট করুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4 sm:mt-7 sm:rounded-2xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

            {/* User Information */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-16 sm:w-16 sm:rounded-2xl">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-gray-600">
                    {firstLetter}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="break-words text-base font-semibold text-gray-900 sm:text-lg">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:shrink-0"
            >
              <LogOut size={16} />
              <span>
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </span>
            </button>
          </div>
        </section>

        {/* Profile Information */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:mt-5 sm:rounded-2xl sm:p-6">
          <h2 className="text-base font-semibold text-gray-900">
            তথ্য
          </h2>

          <div className="mt-5 space-y-5 sm:mt-7">

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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:px-4"
              />
            </div>

            {/* Email */}
            <div>
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
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 sm:px-4"
              />
            </div>

            {/* Update Button */}
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-32"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
