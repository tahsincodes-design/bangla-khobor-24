import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AuthShell from "@/Components/ui/AuthShell";
import SignInForm from "@/Components/auth/SignInForm";

export const metadata: Metadata = {
    title: "সাইন ইন",
    description: "বাংলা নিউজ ২৪ অ্যাকাউন্টে সাইন ইন করুন।",
    alternates: { canonical: "/signIn" },
};

export default function SignInPage() {
    return (
        <AuthShell
            title="আবার স্বাগতম"
            subtitle="আপনার অ্যাকাউন্টে সাইন ইন করে সংবাদ পড়া চালিয়ে যান।"
            footer={
                <p>
                    নতুন ব্যবহারকারী?{" "}
                    <Link href="/signUp" className="font-bold text-brand-700 hover:underline">
                        অ্যাকাউন্ট খুলুন
                    </Link>
                </p>
            }
        >
            <Suspense
                fallback={<div className="h-72 animate-pulse rounded-xl bg-paper-deep" aria-hidden />}
            >
                <SignInForm />
            </Suspense>
        </AuthShell>
    );
}
