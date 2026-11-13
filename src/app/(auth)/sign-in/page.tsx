"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message as string);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] flex flex-col items-center justify-center px-4 py-8 text-[#1f2923]">
      {/* Heading */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          সাইন ইন
        </h1>

        <p className="text-sm text-[#737c74]">
          বিস্তারিত দাম, বাজার তথ্য ও প্রয়োজনীয় তথ্য পেতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Sign In Card */}
      <Card className="w-full max-w-[432px] bg-[#fbfdfb] border border-[#dce5dc] rounded-2xl p-6 sm:p-7 shadow-none">
        <Card.Content className="flex flex-col gap-4 p-0">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-2 w-full"
            >
              <Label className="block text-sm font-medium text-[#1f2923]">
                ইমেইল
              </Label>

              <div className="relative flex items-center">
                <Input
                  placeholder="you@example.com"
                  className="w-full h-[42px] px-3 rounded-lg border border-[#dce5dc] bg-transparent text-sm text-[#1f2923] placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:bg-transparent outline-none transition"
                />
              </div>

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              isRequired
              className="flex flex-col gap-2 w-full"
            >
              <Label className="block text-sm font-medium text-[#1f2923]">
                পাসওয়ার্ড
              </Label>

              <div className="relative flex items-center">
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষরের"
                  className="w-full h-[42px] px-3 pr-10 rounded-lg border border-[#dce5dc] bg-transparent text-sm text-[#1f2923] placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:bg-transparent outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3 text-[#737c74] hover:text-green-700 focus:outline-none transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Forgot Password */}
            <div className="w-full text-right -mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-[#078b42] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="w-full h-[43px] bg-[#078b42] hover:bg-[#067638] text-white font-semibold text-sm rounded-lg shadow-md shadow-green-800/20 transition duration-200 active:scale-[0.99]"
            >
              সাইন ইন
            </Button>
          </Form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4">
            <Separator className="flex-1 bg-[#dce5dc]" />
            <span className="text-xs text-[#737c74]">অথবা</span>
            <Separator className="flex-1 bg-[#dce5dc]" />
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-[42px] flex items-center justify-center gap-2 border border-[#dce5dc] rounded-lg bg-transparent hover:bg-[#f0f5f0] text-[#1f2923] font-semibold text-xs sm:text-sm shadow-none transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 shrink-0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            <span>Sign in with Google</span>
          </Button>
        </Card.Content>

        {/* Footer */}
        <Card.Footer className="flex flex-col items-center gap-4 p-0 pt-5">
          <p className="text-center text-sm text-[#1f2923]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-[#078b42] font-medium hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#7b857d] hover:text-green-700 transition"
          >
            <ArrowLeft size={14} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </Card.Footer>
      </Card>
    </main>
  );
}