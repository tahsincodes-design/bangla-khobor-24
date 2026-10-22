import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileView from "@/Components/profile/ProfileView";

export const metadata: Metadata = {
    title: "আমার প্রোফাইল",
    description: "আপনার বাংলা নিউজ ২৪ অ্যাকাউন্ট, নিরাপত্তা ও সেশন পরিচালনা করুন।",
    robots: { index: false, follow: false },
};

export default function ProfilePage() {
    return (
        <Suspense
            fallback={
                <div className="mx-auto w-full max-w-5xl px-4 py-10">
                    <div className="h-48 animate-pulse rounded-3xl bg-paper-deep" aria-hidden />
                </div>
            }
        >
            <ProfileView />
        </Suspense>
    );
}
