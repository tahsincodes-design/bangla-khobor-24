"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ShareBar({
    title,
    url,
    className = "",
}: {
    title: string;
    url: string;
    className?: string;
}) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success("লিঙ্ক কপি হয়েছে!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("লিঙ্ক কপি করা যায়নি।");
        }
    };

    const nativeShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                return;
            }
        }
        await copy();
    };

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(`${title} — বাংলা নিউজ ২৪`);

    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            <button
                type="button"
                onClick={nativeShare}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-700"
            >
                <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4M18 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    />
                </svg>
                শেয়ার
            </button>

            <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="হোয়াটসঅ্যাপে শেয়ার করুন"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.98 11.98 0 005.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.05 21.785h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.455-9.885 9.938-9.885a9.86 9.86 0 016.988 2.9 9.79 9.79 0 012.9 6.99c-.003 5.45-4.456 9.888-9.94 9.888z" />
                </svg>
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="ফেসবুকে শেয়ার করুন"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="এক্স-এ শেয়ার করুন"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>

            <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-line-strong hover:bg-paper"
                aria-live="polite"
            >
                <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
                {copied ? "কপি হয়েছে" : "লিঙ্ক"}
            </button>
        </div>
    );
}
