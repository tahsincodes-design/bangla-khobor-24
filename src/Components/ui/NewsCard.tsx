import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";
import { formatDate, timeAgo } from "@/lib/format";

type Variant = "default" | "horizontal" | "overlay" | "compact";

const imageSizes = {
    default: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    horizontal: "(max-width: 768px) 40vw, 200px",
    overlay: "(max-width: 1024px) 100vw, 60vw",
    compact: "0px",
};

export default function NewsCard({
    article,
    variant = "default",
    priority = false,
    className = "",
}: {
    article: Article;
    variant?: Variant;
    priority?: boolean;
    className?: string;
}) {
    if (variant === "compact") {
        return (
            <Link
                href={`/news/${article.id}`}
                className={`group flex items-start gap-3 border-b border-line/70 py-3 last:border-0 ${className}`}
            >
                <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold tracking-wide text-brand-600 uppercase">
                        {article.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors group-hover:text-brand-700">
                        {article.title}
                    </h3>
                    <span className="mt-1.5 block text-[11px] text-muted">
                        {timeAgo(article.publishedAt)}
                    </span>
                </div>
                {article.imageUrl ? (
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-paper-deep">
                        <Image
                            src={article.imageUrl}
                            alt={article.imageAlt || article.title}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ) : null}
            </Link>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link
                href={`/news/${article.id}`}
                className={`group flex gap-4 rounded-2xl border border-line bg-surface p-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift ${className}`}
            >
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-paper-deep sm:w-36">
                    {article.imageUrl ? (
                        <Image
                            src={article.imageUrl}
                            alt={article.imageAlt || article.title}
                            fill
                            sizes={imageSizes.horizontal}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted">
                            ছবি নেই
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1 py-1">
                    <span className="text-[11px] font-bold tracking-wide text-brand-600 uppercase">
                        {article.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-[15px] leading-snug font-bold text-ink transition-colors group-hover:text-brand-700">
                        {article.title}
                    </h3>
                    <p className="mt-1 hidden text-xs text-muted sm:line-clamp-2">
                        {article.description}
                    </p>
                    <span className="mt-2 block text-[11px] text-muted">
                        {timeAgo(article.publishedAt)}
                    </span>
                </div>
            </Link>
        );
    }

    if (variant === "overlay") {
        return (
            <Link
                href={`/news/${article.id}`}
                className={`group relative block overflow-hidden rounded-3xl bg-ink text-paper shadow-lift ${className}`}
            >
                <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                    {article.imageUrl ? (
                        <Image
                            src={article.imageUrl}
                            alt={article.imageAlt || article.title}
                            fill
                            priority={priority}
                            sizes={imageSizes.overlay}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-gold-300 uppercase">
                        <span className="rounded-full bg-brand-600 px-2.5 py-1 text-paper">
                            {article.category}
                        </span>
                        {article.isLive ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-2.5 py-1 text-paper/90">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300" />
                                লাইভ
                            </span>
                        ) : null}
                    </div>
                    <h3 className="mt-3 line-clamp-3 text-[1.55rem] leading-tight font-bold text-paper transition-colors group-hover:text-gold-200 sm:text-4xl">
                        {article.title}
                    </h3>
                    <p className="mt-2 hidden max-w-2xl text-sm text-paper/75 sm:line-clamp-2">
                        {article.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-paper/60">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="h-1 w-1 rounded-full bg-paper/40" />
                        <span>{timeAgo(article.publishedAt)}</span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/news/${article.id}`}
            className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift ${className}`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                {article.imageUrl ? (
                    <Image
                        src={article.imageUrl}
                        alt={article.imageAlt || article.title}
                        fill
                        priority={priority}
                        sizes={imageSizes.default}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted">
                        ছবি নেই
                    </div>
                )}

                <div className="absolute top-3 left-3">
                    <span className="inline-flex rounded-full bg-paper/95 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-700 uppercase shadow-sm backdrop-blur">
                        {article.category}
                    </span>
                </div>

                {article.isLive ? (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        লাইভ
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="line-clamp-2 text-lg leading-snug font-bold text-ink transition-colors group-hover:text-brand-700">
                    {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                    {article.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3 text-[11px] text-muted">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-700 transition-all lg:opacity-0 lg:group-hover:translate-x-0.5 lg:group-hover:opacity-100">
                        পড়ুন
                        <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            aria-hidden
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
