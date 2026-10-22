import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AuthShell from "@/Components/ui/AuthShell";
import SignUpForm from "@/Components/auth/SignUpForm";

export const metadata: Metadata = {
    title: "অ্যাকাউন্ট খুলুন",
    description: "বাংলা নিউজ ২৪-এ নতুন অ্যাকাউন্ট তৈরি করুন।",
    alternates: { canonical: "/signUp" },
};

export default function SignUpPage() {
    return (
        <AuthShell
            title="নতুন অ্যাকাউন্ট তৈরি করুন"
            subtitle="মাত্র কয়েকটি তথ্য দিয়ে শুরু করুন — অতিরিক্ত কোনো প্রশ্ন নেই।"
            footer={
                <p>
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signIn" className="font-bold text-brand-700 hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            }
        >
            <Suspense
                fallback={<div className="h-96 animate-pulse rounded-xl bg-paper-deep" aria-hidden />}
            >
                <SignUpForm />
            </Suspense>
        </AuthShell>
    );
}
