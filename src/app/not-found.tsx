import Link from "next/link";
import Container from "@/Components/ui/Container";
import BackButton from "@/Components/ui/BackButton";
import { getCategories } from "@/lib/news-api";

export default async function NotFound() {
    const categories = (await getCategories()).slice(0, 6);

    return (
        <Container size="narrow" className="py-14 sm:py-20">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-12">
                <div
                    className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl"
                    aria-hidden
                />

                <p className="relative font-serif text-7xl font-bold text-brand-600 sm:text-8xl">
                    ৪০৪
                </p>
                <h1 className="relative mt-3 text-2xl font-bold text-ink sm:text-3xl">
                    পৃষ্ঠাটি পাওয়া যায়নি
                </h1>
                <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে অথবা
                    লিঙ্কটি ভুল।
                </p>

                <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        হোমপেজে যান
                    </Link>
                    <BackButton />
                </div>

                <form action="/search" method="get" role="search" className="relative mx-auto mt-8 max-w-md">
                    <input
                        type="search"
                        name="q"
                        placeholder="সংবাদ খুঁজুন..."
                        aria-label="সংবাদ খুঁজুন"
                        className="w-full rounded-xl border border-line bg-paper/60 py-3 pr-4 pl-4 text-sm text-ink placeholder:text-muted/70 focus:border-brand-300 focus:bg-surface focus:outline-none"
                    />
                </form>

                <div className="relative mt-9 border-t border-line pt-6">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                        জনপ্রিয় বিভাগ
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="rounded-full border border-line bg-paper/60 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
