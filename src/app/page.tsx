import Link from "next/link";
import Container from "@/Components/ui/Container";
import NewsCard from "@/Components/ui/NewsCard";
import SectionHeading from "@/Components/ui/SectionHeading";
import EmptyState from "@/Components/ui/EmptyState";
import { formatFullDate, timeAgo, toBengaliNumber } from "@/lib/format";
import { getAllArticles, getMostRead, getSections } from "@/lib/news-api";

export default async function HomePage() {
    const [sections, articles, mostRead] = await Promise.all([
        getSections(),
        getAllArticles(),
        getMostRead(6),
    ]);

    const lead = articles[0];

    if (!lead) {
        return (
            <Container className="py-14">
                <EmptyState
                    title="এখন কোনো সংবাদ পাওয়া যাচ্ছে না"
                    description="সংবাদ সেবা সাময়িকভাবে অনুপলব্ধ। কিছুক্ষণ পর আবার চেষ্টা করুন।"
                    actionHref="/search"
                    actionLabel="সংবাদ খুঁজুন"
                />
            </Container>
        );
    }

    const secondary = articles.slice(1, 3);
    const latest = articles.slice(3, 7);
    const heroIds = new Set([lead.id, ...secondary.map((item) => item.id), ...latest.map((item) => item.id)]);

    const contentSections = sections
        .filter((section) => section.slug !== "top-stories")
        .map((section) => ({
            ...section,
            articles: section.articles.filter((article) => !heroIds.has(article.id)).slice(0, 3),
        }))
        .filter((section) => section.articles.length > 0)
        .slice(0, 5);

    const categoryCounts = articles.reduce<Record<string, number>>((counts, article) => {
        counts[article.category] = (counts[article.category] ?? 0) + 1;
        return counts;
    }, {});

    return (
        <Container className="py-6 sm:py-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden />
                    আজকের নির্বাচিত
                </p>
                <p className="text-xs font-medium text-muted">{formatFullDate()}</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <NewsCard article={lead} variant="overlay" priority />
                </div>

                <div className="flex flex-col gap-4 lg:col-span-5">
                    {secondary.map((article) => (
                        <NewsCard key={article.id} article={article} variant="horizontal" />
                    ))}

                    <div className="flex flex-1 flex-col rounded-2xl border border-line bg-surface p-4 shadow-card sm:p-5">
                        <div className="mb-2 flex items-center justify-between border-b border-line pb-2.5">
                            <h2 className="text-sm font-bold tracking-wide text-ink">সর্বশেষ</h2>
                            <Link
                                href="/search"
                                className="text-[11px] font-semibold text-brand-700 hover:underline"
                            >
                                সব খবর
                            </Link>
                        </div>
                        <div className="flex flex-1 flex-col justify-center divide-y divide-line/70">
                            {latest.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/news/${article.id}`}
                                    className="group flex items-start gap-3 py-2.5"
                                >
                                    <span className="mt-0.5 w-20 shrink-0 text-[10px] font-semibold whitespace-nowrap text-muted">
                                        {timeAgo(article.publishedAt)}
                                    </span>
                                    <span className="line-clamp-2 text-[13px] leading-snug font-semibold text-ink-soft transition-colors group-hover:text-brand-700">
                                        {article.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-12">
                    {contentSections.map((section, index) => (
                        <section key={section.slug} aria-labelledby={`section-${section.slug}`}>
                            <SectionHeading
                                id={`section-${section.slug}`}
                                title={section.title}
                                href={`/category/${section.slug}`}
                                description={index === 0 ? section.description : undefined}
                            />

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {section.articles.map((article) => (
                                    <NewsCard key={article.id} article={article} />
                                ))}

                                {section.articles.length < 3 ? (
                                    <Link
                                        href={`/category/${section.slug}`}
                                        className="group flex min-h-[260px] flex-col justify-between rounded-2xl border border-dashed border-line-strong bg-paper-deep/40 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                                    >
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-brand-600 shadow-sm">
                                            <svg
                                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                                        </span>
                                        <span>
                                            <span className="block text-[11px] font-bold tracking-[0.16em] text-brand-600 uppercase">
                                                আরও {section.title}
                                            </span>
                                            <span className="mt-1 block font-serif text-xl font-bold text-ink transition-colors group-hover:text-brand-700">
                                                সব সংবাদ দেখুন
                                            </span>
                                            <span className="mt-1 block text-xs leading-relaxed text-muted">
                                                এই বিভাগের সর্বশেষ প্রতিবেদনগুলো এক জায়গায়।
                                            </span>
                                        </span>
                                    </Link>
                                ) : null}
                            </div>
                        </section>
                    ))}
                </div>

                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                        <div className="mb-4 flex items-center gap-2 border-b border-line pb-3">
                            <span className="h-4 w-1 rounded-full bg-brand-600" aria-hidden />
                            <h2 className="text-base font-bold text-ink">সর্বাধিক পঠিত</h2>
                        </div>
                        <ol className="space-y-4">
                            {mostRead.map((article, index) => (
                                <li key={article.id}>
                                    <Link
                                        href={`/news/${article.id}`}
                                        className="group flex items-start gap-3"
                                    >
                                        <span className="font-serif text-xl leading-none font-bold text-line-strong transition-colors group-hover:text-brand-600">
                                            {toBengaliNumber(String(index + 1).padStart(2, "0"))}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="line-clamp-2 text-[13px] leading-snug font-semibold text-ink-soft transition-colors group-hover:text-brand-700">
                                                {article.title}
                                            </span>
                                            <span className="mt-1 block text-[10px] font-medium text-muted">
                                                {article.category} ·{" "}
                                                {toBengaliNumber(article.views ?? 0)} পাঠ
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                        <h2 className="mb-3 border-b border-line pb-3 text-base font-bold text-ink">
                            বিভাগ ঘুরে দেখুন
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {Array.from(
                                new Set(
                                    articles.map((article) => article.categorySlug),
                                ),
                            ).map((slug) => {
                                const category = sections.find((item) => item.slug === slug);
                                const title =
                                    articles.find((article) => article.categorySlug === slug)
                                        ?.category ?? slug;
                                return (
                                    <Link
                                        key={slug}
                                        href={`/category/${slug}`}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/60 px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                                    >
                                        {category?.title ?? title}
                                        <span className="text-[10px] text-muted">
                                            {toBengaliNumber(categoryCounts[title] ?? 0)}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-ink p-5 text-paper shadow-card">
                        <div
                            className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-600/40 blur-2xl"
                            aria-hidden
                        />
                        <p className="relative text-[11px] font-bold tracking-[0.16em] text-gold-300 uppercase">
                            আপনার অ্যাকাউন্ট
                        </p>
                        <h2 className="relative mt-1.5 text-lg leading-snug font-bold">
                            পছন্দের সংবাদ সংরক্ষণ করুন
                        </h2>
                        <p className="relative mt-2 text-xs leading-relaxed text-paper/60">
                            নিরাপদ সেশন, প্রোফাইল ও পাসওয়ার্ড নিয়ন্ত্রণ এক জায়গায়।
                        </p>
                        <Link
                            href="/signUp"
                            className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-gold-200"
                        >
                            শুরু করুন
                            <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.4}
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
                </aside>
            </div>
        </Container>
    );
}
