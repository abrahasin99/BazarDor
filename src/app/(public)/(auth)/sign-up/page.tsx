
"use client";

import React, { useEffect, useState } from "react";
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
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.701 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" />
    </svg>
  );
}

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const router = useRouter();

  /*
   * Google/GitHub redirect away from this page.
   * This checks whether the user came back after
   * successfully completing social signup.
   */
  useEffect(() => {
    const signupSuccess = sessionStorage.getItem("signupSuccess");

    if (signupSuccess === "true") {
      sessionStorage.removeItem("signupSuccess");

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", {
        duration: 4000,
      });
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || socialLoading) return;

    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data: resData, error } = await signUp.email({
        email: data.email as string,
        password: data.password as string,
        name: data.name as string,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      if (resData?.user) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। সাইন ইন করুন।", {
          duration: 4000,
        });

        router.push("/sign-in");
      }
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করার সময় সমস্যা হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (socialLoading || isSubmitting) return;

    try {
      setSocialLoading("google");

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message as string);
        setSocialLoading(null);
        return;
      }

      sessionStorage.setItem("signupSuccess", "true");
    } catch {
      toast.error("Google দিয়ে সাইন আপ করা যায়নি!");
      setSocialLoading(null);
    }
  };

  const handleGithubSignUp = async () => {
    if (socialLoading || isSubmitting) return;

    try {
      setSocialLoading("github");

      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message as string);
        setSocialLoading(null);
        return;
      }

      sessionStorage.setItem("signupSuccess", "true");
    } catch {
      toast.error("GitHub দিয়ে সাইন আপ করা যায়নি!");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-3 py-6 text-[#1f2923] sm:px-6 sm:py-10">
      {/* Heading */}
      <div className="mb-5 w-full max-w-[432px] text-center sm:mb-7">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mx-auto max-w-md text-xs leading-5 text-[#737c74] sm:text-sm sm:leading-6">
          বিস্তারিত দাম, বাজার তথ্য ও প্রয়োজনীয় তথ্য পেতে অ্যাকাউন্ট তৈরি
          করুন।
        </p>
      </div>

      {/* Sign Up Card */}
      <Card className="w-full max-w-[432px] rounded-xl border border-[#dce5dc] bg-[#fbfdfb] p-4 shadow-none sm:rounded-2xl sm:p-7">
        <Card.Content className="flex flex-col gap-4 p-0">
          <Form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            {/* Full Name */}
            <TextField
              name="name"
              type="text"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-sm font-medium text-[#1f2923]">
                পূর্ণ নাম
              </Label>

              <Input
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="h-[44px] w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm text-[#1f2923] outline-none transition placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:bg-transparent focus:ring-2 focus:ring-green-100"
              />

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-sm font-medium text-[#1f2923]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-[44px] w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm text-[#1f2923] outline-none transition placeholder:text-[#737c74] hover:border-green-600 focus:border-green-600 focus:bg-transparent focus:ring-2 focus:ring-green-100"
              />

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              minLength={6}
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-sm font-medium text-[#1f2923]">
                পাসওয়ার্ড
              </Label>

              <div className="relative flex w-full items-center">
                <Input
                  placeholder="কমপক্ষে ৬টি অক্ষর"
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
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              isRequired
              isInvalid={!!passwordError}
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-sm font-medium text-[#1f2923]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <div className="relative flex w-full items-center">
                <Input
                  placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                  className={`h-[44px] w-full rounded-lg border bg-transparent px-3 text-sm text-[#1f2923] outline-none transition placeholder:text-[#737c74] ${
                    passwordError
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#dce5dc] hover:border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  }`}
                />
              </div>

              {passwordError ? (
                <span className="text-xs text-red-500">{passwordError}</span>
              ) : (
                <FieldError className="text-xs text-red-500" />
              )}
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              isDisabled={isSubmitting || !!socialLoading}
              className="mt-1 h-[44px] w-full rounded-lg bg-[#078b42] text-sm font-semibold text-white shadow-md shadow-green-800/20 transition duration-200 hover:bg-[#067638] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex w-full items-center gap-3 sm:gap-4">
            <Separator className="flex-1 bg-[#dce5dc]" />

            <span className="shrink-0 text-xs text-[#737c74]">অথবা</span>

            <Separator className="flex-1 bg-[#dce5dc]" />
          </div>

          {/* Google Sign Up */}
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            isDisabled={!!socialLoading || isSubmitting}
            variant="outline"
            className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-transparent text-xs font-semibold text-[#1f2923] shadow-none transition hover:bg-[#f0f5f0] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
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

            <span>
              {socialLoading === "google"
                ? "Connecting to Google..."
                : "Sign up with Google"}
            </span>
          </Button>

          {/* GitHub Sign Up */}
          <Button
            type="button"
            onClick={handleGithubSignUp}
            isDisabled={!!socialLoading || isSubmitting}
            variant="outline"
            className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-transparent text-xs font-semibold text-[#1f2923] shadow-none transition hover:bg-[#f0f5f0] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            <GithubIcon />

            <span>
              {socialLoading === "github"
                ? "Connecting to GitHub..."
                : "Sign up with GitHub"}
            </span>
          </Button>
        </Card.Content>

        {/* Footer */}
        <Card.Footer className="flex flex-col items-center gap-4 p-0 pt-5">
          <p className="text-center text-xs leading-5 text-[#1f2923] sm:text-sm">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#078b42] hover:underline"
            >
              সাইন ইন করুন
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
