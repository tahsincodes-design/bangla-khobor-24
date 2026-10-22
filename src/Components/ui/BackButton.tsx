"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "পূর্ববর্তী পৃষ্ঠা" }: { label?: string }) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-line-strong hover:bg-paper"
        >
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7M3 12h18" />
            </svg>
            {label}
        </button>
    );
}
