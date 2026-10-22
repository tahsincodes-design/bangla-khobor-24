"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.webp";
import UserMenu from "@/Components/ui/UserMenu";
import type { Category } from "@/types/news";

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({
    categories,
    today,
}: {
    categories: Category[];
    today: string;
}) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <div className="sticky top-0 z-50 border-b border-line bg-paper">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                        <span className="overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-sm">
                            <Image
                                src={logo}
                                alt="বাংলা নিউজ ২৪"
                                width={34}
                                height={34}
                                priority
                                className="object-contain"
                            />
                        </span>
                        <span className="font-serif text-xl leading-none font-bold tracking-tight text-ink sm:text-[1.4rem]">
                            <span className="hidden sm:inline">বাংলা নিউজ </span>
                            <span className="sm:hidden">বাংলা </span>
                            <span className="text-brand-600">২৪</span>
                        </span>
                    </Link>

                    <form
                        action="/search"
                        method="get"
                        role="search"
                        className="hidden max-w-sm flex-1 items-center md:flex"
                    >
                        <div className="relative w-full">
                            <svg
                                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                            </svg>
                            <input
                                type="search"
                                name="q"
                                placeholder="সংবাদ খুঁজুন..."
                                aria-label="সংবাদ খুঁজুন"
                                className="w-full rounded-full border border-line bg-surface py-2 pr-4 pl-10 text-sm text-ink transition-colors placeholder:text-muted/70 focus:border-brand-300 focus:ring-4 focus:ring-brand-600/10 focus:outline-none"
                            />
                        </div>
                    </form>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="hidden text-xs font-medium text-muted xl:block">{today}</span>

                        <Link
                            href="/search"
                            aria-label="সংবাদ খুঁজুন"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700 md:hidden"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                            </svg>
                        </Link>

                        <UserMenu />

                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="মেনু খুলুন"
                            aria-expanded={menuOpen}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-line-strong lg:hidden"
                        >
                            <svg
                                className="h-4.5 w-4.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden
                            >
                                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <nav aria-label="বিভাগসমূহ" className="hidden lg:block">
                    <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto pb-0">
                        <li>
                            <Link
                                href="/"
                                aria-current={isActive(pathname, "/") ? "page" : undefined}
                                className={`relative flex items-center px-3 py-2.5 text-sm font-semibold transition-colors ${
                                    isActive(pathname, "/")
                                        ? "text-brand-700"
                                        : "text-ink-soft hover:text-brand-700"
                                }`}
                            >
                                হোম
                                {isActive(pathname, "/") ? (
                                    <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-600" />
                                ) : null}
                            </Link>
                        </li>
                        {categories.map((category) => {
                            const href = `/category/${category.slug}`;
                            const active = isActive(pathname, href);
                            return (
                                <li key={category.slug}>
                                    <Link
                                        href={href}
                                        aria-current={active ? "page" : undefined}
                                        className={`relative flex items-center px-3 py-2.5 text-sm font-semibold transition-colors ${
                                            active
                                                ? "text-brand-700"
                                                : "text-ink-soft hover:text-brand-700"
                                        }`}
                                    >
                                        {category.title}
                                        {active ? (
                                            <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-600" />
                                        ) : null}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="ml-auto">
                            <Link
                                href="/about"
                                className="px-3 py-2.5 text-xs font-medium text-muted transition-colors hover:text-brand-700"
                            >
                                আমাদের সম্পর্কে
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {menuOpen ? (
                <div className="fixed inset-0 z-[70] lg:hidden">
                    <button
                        type="button"
                        aria-label="মেনু বন্ধ করুন"
                        onClick={() => setMenuOpen(false)}
                        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="নেভিগেশন মেনু"
                        className="absolute top-0 right-0 flex h-full w-[86%] max-w-sm flex-col bg-paper shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <span className="font-serif text-lg font-bold text-ink">
                                বাংলা নিউজ <span className="text-brand-600">২৪</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                aria-label="মেনু বন্ধ করুন"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden
                                >
                                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-5">
                            <form action="/search" method="get" role="search">
                                <div className="relative">
                                    <svg
                                        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                                    </svg>
                                    <input
                                        type="search"
                                        name="q"
                                        placeholder="সংবাদ খুঁজুন..."
                                        aria-label="সংবাদ খুঁজুন"
                                        className="w-full rounded-xl border border-line bg-surface py-2.5 pr-4 pl-10 text-sm text-ink placeholder:text-muted/70 focus:border-brand-300 focus:outline-none"
                                    />
                                </div>
                            </form>

                            <p className="mt-6 mb-2 text-[11px] font-bold tracking-[0.18em] text-muted uppercase">
                                বিভাগসমূহ
                            </p>
                            <nav aria-label="মোবাইল বিভাগসমূহ">
                                <ul className="space-y-0.5">
                                    <li>
                                        <Link
                                            href="/"
                                            onClick={() => setMenuOpen(false)}
                                            className={`block rounded-xl px-3 py-2.5 text-sm font-semibold ${
                                                pathname === "/"
                                                    ? "bg-brand-50 text-brand-700"
                                                    : "text-ink-soft hover:bg-surface"
                                            }`}
                                        >
                                            হোম
                                        </Link>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.slug}>
                                            <Link
                                                href={`/category/${category.slug}`}
                                                onClick={() => setMenuOpen(false)}
                                                className={`block rounded-xl px-3 py-2.5 text-sm font-semibold ${
                                                    pathname === `/category/${category.slug}`
                                                        ? "bg-brand-50 text-brand-700"
                                                        : "text-ink-soft hover:bg-surface"
                                                }`}
                                            >
                                                {category.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <p className="mt-6 mb-2 text-[11px] font-bold tracking-[0.18em] text-muted uppercase">
                                আরও
                            </p>
                            <ul className="space-y-0.5">
                                {[
                                    { href: "/search", label: "সংবাদ খুঁজুন" },
                                    { href: "/about", label: "আমাদের সম্পর্কে" },
                                    { href: "/contact", label: "যোগাযোগ" },
                                    { href: "/profile", label: "আমার প্রোফাইল" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-line px-5 py-4 text-xs text-muted">{today}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
