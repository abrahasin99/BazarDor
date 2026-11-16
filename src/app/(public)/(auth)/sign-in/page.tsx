
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
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.75z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.87A5.85 5.85 0 0 1 6.23 12c0-.65.11-1.28.31-1.87V7.62H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.38l3.24-2.51z"
      />
      <path
        fill="#EA4335"
        d="M12 6.1c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.18 14.62 2.25 12 2.25A9.74 9.74 0 0 0 3.3 7.62l3.24 2.51C7.31 7.82 9.46 6.1 12 6.1z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.701 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" />
    </svg>
  );
}

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null
  );

  const getCallbackURL = () => {
    return (
      new URLSearchParams(window.location.search).get("callbackURL") || "/"
    );
  };

  const addLoginSuccess = (url: string) => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}login=success`;
  };

  // Email + Password
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const callbackURL = addLoginSuccess(getCallbackURL());

    try {
      setIsSubmitting(true);

      const { error } = await signIn.email({
        email: data.email as string,
        password: data.password as string,
        callbackURL,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      toast.success("সফলভাবে সাইন ইন করেছেন!", {
        duration: 4000,
      });
    } catch {
      toast.error("সাইন ইন করার সময় সমস্যা হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google
  const handleGoogleSignIn = async () => {
    if (socialLoading) return;

    const callbackURL = addLoginSuccess(getCallbackURL());

    try {
      setSocialLoading("google");

      const { error } = await signIn.social({
        provider: "google",
        callbackURL,
      });

      if (error) {
        toast.error(error.message as string);
      }
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
      setSocialLoading(null);
    }
  };

  // GitHub
  const handleGithubSignIn = async () => {
    if (socialLoading) return;

    const callbackURL = addLoginSuccess(getCallbackURL());

    try {
      setSocialLoading("github");

      const { error } = await signIn.social({
        provider: "github",
        callbackURL,
      });

      if (error) {
        toast.error(error.message as string);
        setSocialLoading(null);
      }
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-3 py-6 text-[#1f2923] sm:px-6 sm:py-10">
      {/* Heading */}
      <div className="mb-5 w-full max-w-[432px] text-center sm:mb-7">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          সাইন ইন
        </h1>

        <p className="mx-auto max-w-md text-xs leading-5 text-[#737c74] sm:text-sm sm:leading-6">
          বিস্তারিত দাম, বাজার তথ্য ও প্রয়োজনীয় তথ্য পেতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Sign In Card */}
      <Card className="w-full max-w-[432px] rounded-xl border border-[#dce5dc] bg-[#fbfdfb] p-4 shadow-none sm:rounded-2xl sm:p-7">
        <Card.Content className="flex flex-col gap-4 p-0">
          <Form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="block text-sm font-medium text-[#1f2923]">
                ইমেইল
              </Label>

              <div className="relative flex w-full items-center">
                <Input
                  placeholder="you@example.com"
                  className="h-[44px] w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm text-[#1f2923] outline-none transition placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:bg-transparent focus:ring-2 focus:ring-green-100"
                />
              </div>

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="block text-sm font-medium text-[#1f2923]">
                পাসওয়ার্ড
              </Label>

              <div className="relative flex w-full items-center">
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষরের"
                  className="h-[44px] w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 pr-10 text-sm text-[#1f2923] outline-none transition placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:bg-transparent focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3 text-[#737c74] transition-colors hover:text-green-700 focus:outline-none"
                  aria-label={
                    isVisible ? "Hide password" : "Show password"
                  }
                >
                  {isVisible ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Forgot Password */}
            <div className="-mt-1 w-full text-right">
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
              isDisabled={isSubmitting || !!socialLoading}
              className="h-[44px] w-full rounded-lg bg-[#078b42] text-sm font-semibold text-white shadow-md shadow-green-800/20 transition duration-200 hover:bg-[#067638] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex w-full items-center gap-3 sm:gap-4">
            <Separator className="flex-1 bg-[#dce5dc]" />

            <span className="shrink-0 text-xs text-[#737c74]">
              অথবা
            </span>

            <Separator className="flex-1 bg-[#dce5dc]" />
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={!!socialLoading || isSubmitting}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              <GoogleIcon />
              <span>
                {socialLoading === "google"
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={!!socialLoading || isSubmitting}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              <GithubIcon />
              <span>
                {socialLoading === "github"
                  ? "Connecting to GitHub..."
                  : "Continue with GitHub"}
              </span>
            </button>
          </div>
        </Card.Content>

        {/* Footer */}
        <Card.Footer className="flex flex-col items-center gap-4 p-0 pt-5">
          <p className="text-center text-xs leading-5 text-[#1f2923] sm:text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#078b42] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#7b857d] transition hover:text-green-700 sm:text-sm"
          >
            <ArrowLeft size={14} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </Card.Footer>
      </Card>
    </main>
  );
}
