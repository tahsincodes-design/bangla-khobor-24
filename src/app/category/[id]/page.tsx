import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import NewsCard from "@/Components/ui/NewsCard";
import PageHeader from "@/Components/ui/PageHeader";
import EmptyState from "@/Components/ui/EmptyState";
import { getCategories, getCategoryPage } from "@/lib/news-api";
import { toBengaliNumber } from "@/lib/format";

const PAGE_SIZE = 9;

interface CategoryPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { id } = await params;
    const data = await getCategoryPage(id, 1, PAGE_SIZE);
    if (!data) return { title: "বিভাগ পাওয়া যায়নি" };

    return {
        title: `${data.title} — সর্বশেষ খবর`,
        description:
            data.description ?? `${data.title} বিভাগের সর্বশেষ ও গুরুত্বপূর্ণ সংবাদ পড়ুন বাংলা নিউজ ২৪-এ।`,
        alternates: { canonical: `/category/${id}` },
        openGraph: {
            title: `${data.title} | বাংলা নিউজ ২৪`,
            description: data.description,
        },
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { id } = await params;
    const { page: pageParam } = await searchParams;
    const requestedPage = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

    const [data, categories] = await Promise.all([
        getCategoryPage(id, requestedPage, PAGE_SIZE),
        getCategories(),
    ]);

    if (!data) notFound();

    const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
    const currentPage = Math.min(requestedPage, totalPages);

    const pageData =
        currentPage === requestedPage
            ? data
            : await getCategoryPage(id, currentPage, PAGE_SIZE);

    if (!pageData) notFound();

    const buildPageHref = (page: number) =>
        page <= 1 ? `/category/${id}` : `/category/${id}?page=${page}`;

    return (
        <Container className="py-8 sm:py-10">
            <Breadcrumbs items={[{ label: data.title }]} />

            <PageHeader
                eyebrow="বিভাগ"
                title={data.title}
                description={data.description}
            >
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">
                        {toBengaliNumber(data.total)}টি সংবাদ
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-medium text-muted">
                        পৃষ্ঠা {toBengaliNumber(currentPage)} / {toBengaliNumber(totalPages)}
                    </span>
                </div>
            </PageHeader>

            <nav aria-label="অন্য বিভাগ" className="mt-6 mb-8">
                <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                    {categories.map((category) => {
                        const active = category.slug === id;
                        return (
                            <li key={category.slug} className="shrink-0">
                                <Link
                                    href={`/category/${category.slug}`}
                                    aria-current={active ? "page" : undefined}
                                    className={`inline-flex rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                                        active
                                            ? "border-brand-600 bg-brand-600 text-white"
                                            : "border-line bg-surface text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                                    }`}
                                >
                                    {category.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {pageData.articles.length ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pageData.articles.map((article, index) => (
                        <NewsCard
                            key={article.id}
                            article={article}
                            priority={index < 3}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="এই বিভাগে এখনো কোনো সংবাদ নেই"
                    description="অন্য বিভাগ থেকে সর্বশেষ সংবাদ দেখতে পারেন।"
                    actionHref="/"
                    actionLabel="হোমপেজে ফিরুন"
                />
            )}

            {totalPages > 1 ? (
                <nav
                    aria-label="পৃষ্ঠা পরিবর্তন"
                    className="mt-10 flex items-center justify-between border-t border-line pt-6"
                >
                    {currentPage > 1 ? (
                        <Link
                            href={buildPageHref(currentPage - 1)}
                            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700"
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            পূর্ববর্তী
                        </Link>
                    ) : (
                        <span />
                    )}

                    <span className="text-xs font-medium text-muted">
                        {toBengaliNumber(currentPage)} / {toBengaliNumber(totalPages)}
                    </span>

                    {currentPage < totalPages ? (
                        <Link
                            href={buildPageHref(currentPage + 1)}
                            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700"
                        >
                            পরবর্তী
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>
            ) : null}
        </Container>
    );
}
