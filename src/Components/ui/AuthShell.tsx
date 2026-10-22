"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.webp";

const benefits = [
    {
        title: "নির্ভরযোগ্য সংবাদ",
        description: "যাচাই করা তথ্য ও স্বচ্ছ সূত্রের ভিত্তিতে প্রতিটি প্রতিবেদন।",
    },
    {
        title: "দ্রুত আপডেট",
        description: "দেশ-বিদেশের গুরুত্বপূর্ণ ঘটনার সর্বশেষ খবর মুহূর্তেই।",
    },
    {
        title: "আপনার পছন্দে",
        description: "প্রোফাইল ও সেশন নিয়ন্ত্রণসহ নিরাপদ ব্যক্তিগত অভিজ্ঞতা।",
    },
];

export default function AuthShell({
    title,
    subtitle,
    children,
    footer,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footer: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]">
                <aside className="relative hidden overflow-hidden rounded-3xl bg-ink p-10 text-paper lg:flex lg:flex-col lg:justify-between">
                    <div
                        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl"
                        aria-hidden
                    />

                    <div className="relative">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="overflow-hidden rounded-xl bg-paper p-1.5">
                                <Image
                                    src={logo}
                                    alt="বাংলা নিউজ ২৪"
                                    width={38}
                                    height={38}
                                    className="object-contain"
                                />
                            </span>
                            <span className="font-serif text-2xl font-bold tracking-tight">
                                বাংলা নিউজ <span className="text-brand-400">২৪</span>
                            </span>
                        </Link>

                        <p className="mt-14 text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
                            সত্যের পথে
                        </p>
                        <h2 className="mt-3 max-w-sm text-3xl leading-tight font-bold text-paper">
                            সংবাদের সঙ্গে থাকুন, সিদ্ধান্ত নিন আত্মবিশ্বাসে।
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/65">
                            দেশের নির্ভরযোগ্য সংবাদমাধ্যমের অংশ হোন। আপনার অ্যাকাউন্টে সবশেষ
                            রিপোর্ট, বিশ্লেষণ ও ব্যক্তিগত পছন্দ সংরক্ষণ করুন।
                        </p>
                    </div>

                    <ul className="relative mt-12 space-y-5">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="flex gap-3">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-brand-300">
                                    <svg
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        aria-hidden
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-paper">
                                        {benefit.title}
                                    </p>
                                    <p className="text-xs text-paper/55">{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-9">
                    <div className="mb-7 flex items-center gap-3 lg:hidden">
                        <Image
                            src={logo}
                            alt="বাংলা নিউজ ২৪"
                            width={34}
                            height={34}
                            className="object-contain"
                        />
                        <span className="font-serif text-lg font-bold text-ink">
                            বাংলা নিউজ <span className="text-brand-600">২৪</span>
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-ink sm:text-[1.7rem]">{title}</h1>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{subtitle}</p>

                    <div className="mt-7">{children}</div>

                    <div className="mt-7 border-t border-line pt-5 text-center text-sm text-muted">
                        {footer}
                    </div>
                </section>
            </div>
        </div>
    );
}
