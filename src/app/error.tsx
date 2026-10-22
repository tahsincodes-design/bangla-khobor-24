"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
            <div className="rounded-3xl border border-line bg-surface p-8 text-center shadow-card sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
                        />
                    </svg>
                </div>

                <h1 className="mt-5 text-2xl font-bold text-ink">কিছু একটা সমস্যা হয়েছে</h1>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                    সংবাদ লোড করা যায়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন। সমস্যা থাকলে
                    আমাদের জানান।
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                    >
                        আবার চেষ্টা করুন
                    </button>
                    <Link
                        href="/"
                        className="rounded-xl border border-line bg-surface px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-line-strong hover:bg-paper"
                    >
                        হোমপেজে যান
                    </Link>
                </div>

                {error.digest ? (
                    <p className="mt-6 font-mono text-[11px] text-muted/70">
                        রেফারেন্স: {error.digest}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
