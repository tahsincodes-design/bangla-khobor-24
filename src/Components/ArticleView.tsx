import Image from "next/image";
import Link from "next/link";
import type { ArticleDetail } from "@/types/news";
import { formatDateTime, readingTime, toBengaliNumber } from "@/lib/format";
import ShareBar from "@/Components/ui/ShareBar";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import Container from "@/Components/ui/Container";
import NewsCard from "@/Components/ui/NewsCard";
import SectionHeading from "@/Components/ui/SectionHeading";
import ReadingProgress from "@/Components/ui/ReadingProgress";
import { SITE_URL } from "@/lib/site";
import type { Article } from "@/types/news";

export default function ArticleView({
    article,
    related,
}: {
    article: ArticleDetail;
    related: Article[];
}) {
    const author = article.byline[0];
    const bodyText = article.body
        .map((block) => block.text ?? "")
        .join(" ");
    const readTime = readingTime(article.wordCount ?? bodyText, article.wordCount);
    const shareUrl = `${SITE_URL}/news/${article.id}`;

    return (
        <>
            <ReadingProgress />

            <Container className="py-8 sm:py-10">
                <div className="mx-auto max-w-4xl">
                    <Breadcrumbs
                        items={[
                            {
                                label: article.category,
                                href: `/category/${article.categorySlug}`,
                            },
                            { label: article.title },
                        ]}
                    />

                    <article>
                        <header>
                            <div className="flex flex-wrap items-center gap-2">
                                <Link
                                    href={`/category/${article.categorySlug}`}
                                    className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
                                >
                                    {article.category}
                                </Link>
                                {article.isLive ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-600" />
                                        লাইভ আপডেট
                                    </span>
                                ) : null}
                            </div>

                            <h1 className="mt-4 text-3xl leading-[1.25] font-bold text-balance text-ink sm:text-4xl lg:text-[2.9rem]">
                                {article.title}
                            </h1>

                            {article.description ? (
                                <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
                                    {article.description}
                                </p>
                            ) : null}

                            <div className="mt-6 flex flex-col justify-between gap-4 border-y border-line py-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-sm font-bold text-paper">
                                        {author?.name?.charAt(0) || "ব"}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-ink">
                                            {author?.name ?? article.source ?? "বাংলা নিউজ ২৪"}
                                            {author?.role ? (
                                                <span className="ml-1.5 text-xs font-normal text-muted">
                                                    · {author.role}
                                                </span>
                                            ) : null}
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted">
                                            {formatDateTime(article.publishedAt)}
                                            <span className="mx-1.5 text-line-strong">•</span>
                                            {readTime}
                                        </p>
                                    </div>
                                </div>

                                <ShareBar title={article.title} url={shareUrl} />
                            </div>
                        </header>

                        {article.imageUrl ? (
                            <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-paper-deep">
                                <div className="relative aspect-[16/9] w-full">
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.imageAlt || article.title}
                                        fill
                                        priority
                                        sizes="(max-width: 896px) 100vw, 896px"
                                        className="object-cover"
                                    />
                                </div>
                            </figure>
                        ) : null}

                        <div className="mx-auto mt-8 max-w-[68ch]">
                            {article.body.length ? (
                                <div className="space-y-6">
                                    {article.body.map((block, index) => {
                                        if (block.type === "subheading" && block.text) {
                                            return (
                                                <h2
                                                    key={index}
                                                    className="mt-10 border-l-4 border-brand-600 pl-4 text-xl leading-snug font-bold text-ink sm:text-2xl"
                                                >
                                                    {block.text}
                                                </h2>
                                            );
                                        }

                                        if (block.type === "image" && block.url) {
                                            return (
                                                <figure
                                                    key={index}
                                                    className="my-8 overflow-hidden rounded-2xl border border-line bg-surface"
                                                >
                                                    <div className="relative aspect-video w-full">
                                                        <Image
                                                            src={block.url}
                                                            alt={
                                                                block.altText ||
                                                                block.caption ||
                                                                article.title
                                                            }
                                                            fill
                                                            sizes="(max-width: 896px) 100vw, 720px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    {(block.caption || block.copyrightHolder) && (
                                                        <figcaption className="flex flex-col justify-between gap-1 border-t border-line bg-paper/60 px-4 py-3 text-xs text-muted sm:flex-row sm:items-center">
                                                            {block.caption ? (
                                                                <span>{block.caption}</span>
                                                            ) : (
                                                                <span />
                                                            )}
                                                            {block.copyrightHolder ? (
                                                                <span className="shrink-0 font-medium">
                                                                    © {block.copyrightHolder}
                                                                </span>
                                                            ) : null}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            );
                                        }

                                        if (block.type === "text" && block.text) {
                                            return (
                                                <p
                                                    key={index}
                                                    className="text-[1.05rem] leading-[1.95] whitespace-pre-line text-ink-soft sm:text-lg"
                                                >
                                                    {block.text}
                                                </p>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted">
                                    এই সংবাদে বিস্তারিত বিবরণ নেই।
                                </p>
                            )}

                            {article.tags.length ? (
                                <div className="mt-10 border-t border-line pt-6">
                                    <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                                        সম্পর্কিত ট্যাগ
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/search?q=${encodeURIComponent(tag)}`}
                                                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {article.source ? (
                                <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
                                    সূত্র:{" "}
                                    {article.sourceUrl ? (
                                        <a
                                            href={article.sourceUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-brand-700 hover:underline"
                                        >
                                            {article.source}
                                        </a>
                                    ) : (
                                        <span className="font-semibold text-ink-soft">
                                            {article.source}
                                        </span>
                                    )}
                                    {article.wordCount ? (
                                        <span className="ml-2 text-line-strong">
                                            · {toBengaliNumber(article.wordCount)} শব্দ
                                        </span>
                                    ) : null}
                                </p>
                            ) : null}

                            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
                                <p className="text-sm font-semibold text-ink">
                                    সংবাদটি শেয়ার করুন
                                </p>
                                <ShareBar title={article.title} url={shareUrl} />
                            </div>
                        </div>
                    </article>
                </div>
            </Container>

            {related.length ? (
                <div className="border-t border-line bg-paper-deep/50">
                    <Container className="py-10">
                        <SectionHeading
                            title="সম্পর্কিত সংবাদ"
                            href={`/category/${article.categorySlug}`}
                            linkLabel={`আরও ${article.category}`}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <NewsCard key={item.id} article={item} />
                            ))}
                        </div>
                    </Container>
                </div>
            ) : null}
        </>
    );
}
