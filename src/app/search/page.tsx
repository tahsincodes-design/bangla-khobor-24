import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PageHeader from "@/Components/ui/PageHeader";
import NewsCard from "@/Components/ui/NewsCard";
import EmptyState from "@/Components/ui/EmptyState";
import { getCategories, searchArticles } from "@/lib/news-api";
import { toBengaliNumber } from "@/lib/format";

export const metadata: Metadata = {
    title: "সংবাদ খুঁজুন",
    description: "বাংলা নিউজ ২৪-এর সংবাদ, বিভাগ ও বিষয় অনুযায়ী খুঁজুন।",
    alternates: { canonical: "/search" },
    robots: { index: false, follow: true },
};

const popular = ["জাতীয়", "খেলা", "অর্থনীতি", "প্রযুক্তি", "বিনোদন", "আন্তর্জাতিক"];

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = (q ?? "").trim();
    const [results, categories] = await Promise.all([
        query ? searchArticles(query) : Promise.resolve([]),
        getCategories(),
    ]);

    return (
        <Container className="py-8 sm:py-10">
            <Breadcrumbs items={[{ label: "সংবাদ খুঁজুন" }]} />

            <PageHeader
                eyebrow="অনুসন্ধান"
                title="সংবাদ খুঁজুন"
                description="শিরোনাম, বিবরণ বা বিভাগ লিখে খুঁজুন।"
            />

            <form action="/search" method="get" role="search" className="mt-6 max-w-2xl">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                        <svg
                            className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-muted"
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
                            defaultValue={query}
                            placeholder="যেমন: নির্বাচন, ক্রিকেট, প্রযুক্তি..."
                            aria-label="সংবাদ খুঁজুন"
                            autoFocus
                            className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-sm text-ink shadow-card transition-colors placeholder:text-muted/70 focus:border-brand-300 focus:ring-4 focus:ring-brand-600/10 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                    >
                        খুঁজুন
                    </button>
                </div>
            </form>

            {query ? (
                <div className="mt-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                        <p className="text-sm text-muted">
                            <span className="font-semibold text-ink">“{query}”</span> এর জন্য{" "}
                            {toBengaliNumber(results.length)}টি ফলাফল
                        </p>
                        <Link
                            href="/search"
                            className="text-xs font-semibold text-brand-700 hover:underline"
                        >
                            অনুসন্ধান মুছুন
                        </Link>
                    </div>

                    {results.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((article, index) => (
                                <NewsCard key={article.id} article={article} priority={index < 3} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="কোনো সংবাদ পাওয়া যায়নি"
                            description="অন্য শব্দ দিয়ে খুঁজুন অথবা বিভাগ অনুযায়ী সংবাদ দেখুন।"
                            actionHref="/"
                            actionLabel="হোমপেজে যান"
                        />
                    )}
                </div>
            ) : (
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <section className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                        <h2 className="text-base font-bold text-ink">জনপ্রিয় অনুসন্ধান</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {popular.map((term) => (
                                <Link
                                    key={term}
                                    href={`/search?q=${encodeURIComponent(term)}`}
                                    className="rounded-full border border-line bg-paper/60 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                                >
                                    {term}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                        <h2 className="text-base font-bold text-ink">বিভাগ অনুযায়ী</h2>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/category/${category.slug}`}
                                    className="rounded-xl border border-line bg-paper/40 px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </Container>
    );
}
