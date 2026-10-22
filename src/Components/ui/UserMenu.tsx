"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (!open) return;

        const handleClick = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    const signOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setOpen(false);
                        toast.success("সাইন আউট হয়েছে");
                        router.push("/");
                        router.refresh();
                    },
                },
            });
        } catch {
            toast.error("সাইন আউট করা যায়নি");
        }
    };

    if (isPending) {
        return <div className="h-9 w-9 animate-pulse rounded-full bg-paper-deep" aria-hidden />;
    }

    if (!user) {
        return (
            <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                    href="/signIn"
                    aria-label="সাইন ইন"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700 sm:hidden"
                >
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </Link>
                <Link
                    href="/signIn"
                    className="hidden rounded-full px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-paper-deep hover:text-brand-700 sm:inline-flex sm:text-sm"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/signUp"
                    className="hidden rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-700 sm:inline-flex sm:text-sm"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="অ্যাকাউন্ট মেনু"
                className="flex items-center gap-2 rounded-full border border-line bg-surface p-1 pr-1.5 transition-colors hover:border-line-strong sm:pr-2.5"
            >
                <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-brand-600">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "ব্যবহারকারী"}
                            fill
                            sizes="32px"
                            className="object-cover"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "ব"}
                        </span>
                    )}
                </span>
                <span className="hidden max-w-[7rem] truncate text-xs font-semibold text-ink-soft sm:inline">
                    {user.name || "ব্যবহারকারী"}
                </span>
                <svg
                    className={`hidden h-3.5 w-3.5 text-muted transition-transform sm:block ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {open ? (
                <div
                    role="menu"
                    className="absolute top-full right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
                >
                    <div className="border-b border-line px-4 py-3">
                        <p className="truncate text-sm font-semibold text-ink">
                            {user.name || "ব্যবহারকারী"}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted">{user.email}</p>
                    </div>

                    <div className="p-1.5">
                        <Link
                            href="/profile"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-brand-700"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            আমার প্রোফাইল
                        </Link>
                        <Link
                            href="/profile?tab=security"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-brand-700"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            নিরাপত্তা
                        </Link>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={signOut}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            সাইন আউট
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
