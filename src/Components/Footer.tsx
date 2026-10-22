import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.webp";
import { getCategories } from "@/lib/news-api";
import { toBengaliNumber } from "@/lib/format";

const quickLinks = [
    { href: "/search", label: "সংবাদ খুঁজুন" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/privacy", label: "গোপনীয়তা নীতি" },
    { href: "/terms", label: "ব্যবহারের শর্তাবলী" },
];

export default async function Footer() {
    const categories = await getCategories();
    const year = toBengaliNumber(new Date().getFullYear());

    return (
        <footer className="mt-16 border-t-2 border-brand-600 bg-ink text-paper">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="overflow-hidden rounded-xl bg-paper p-1.5">
                                <Image
                                    src={logo}
                                    alt="বাংলা নিউজ ২৪"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                />
                            </span>
                            <span className="font-serif text-2xl font-bold tracking-tight">
                                বাংলা নিউজ <span className="text-brand-400">২৪</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
                            সত্য, স্বচ্ছতা ও বস্তুনিষ্ঠতার সঙ্গে দেশ-বিদেশের সংবাদ। পাঠকের
                            আস্থাই আমাদের সবচেয়ে বড় সম্পদ।
                        </p>

                        <div className="mt-6 flex items-center gap-2.5">
                            {[
                                {
                                    label: "ফেসবুক",
                                    href: "https://www.facebook.com",
                                    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                                },
                                {
                                    label: "ইউটিউব",
                                    href: "https://www.youtube.com",
                                    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                                },
                                {
                                    label: "এক্স",
                                    href: "https://x.com",
                                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                                },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper/70 transition-colors hover:border-brand-500 hover:bg-brand-600 hover:text-white"
                                >
                                    <svg
                                        className="h-4 w-4 fill-current"
                                        viewBox="0 0 24 24"
                                        aria-hidden
                                    >
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="border-l-2 border-brand-500 pl-2.5 text-xs font-bold tracking-[0.16em] text-paper uppercase">
                            বিভাগসমূহ
                        </h2>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {categories.slice(0, 7).map((category) => (
                                <li key={category.slug}>
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="text-paper/60 transition-colors hover:text-gold-200"
                                    >
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="border-l-2 border-brand-500 pl-2.5 text-xs font-bold tracking-[0.16em] text-paper uppercase">
                            তথ্য
                        </h2>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-paper/60 transition-colors hover:text-gold-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
                        <p className="text-xs font-bold tracking-[0.16em] text-gold-300 uppercase">
                            প্রতিদিনের সংবাদ
                        </p>
                        <h2 className="mt-2 text-lg leading-snug font-bold text-paper">
                            গুরুত্বপূর্ণ খবর সবার আগে জানুন
                        </h2>
                        <p className="mt-2 text-xs leading-relaxed text-paper/55">
                            অ্যাকাউন্ট খুলে সংবাদ সংরক্ষণ করুন এবং নিরাপদ সেশন ব্যবস্থাপনা ব্যবহার
                            করুন।
                        </p>
                        <Link
                            href="/signUp"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                        >
                            অ্যাকাউন্ট খুলুন
                            <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.2}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-black/20">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-paper/40 sm:flex-row sm:px-6 lg:px-8">
                    <p>© {year} বাংলা নিউজ ২৪। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline">সম্পাদক ও প্রকাশক: বাংলা নিউজ ২৪</span>
                        <a
                            href="#top"
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-paper/60 transition-colors hover:border-brand-500 hover:text-paper"
                        >
                            উপরে যান
                            <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.2}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 10l7-7 7 7M12 3v18"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
