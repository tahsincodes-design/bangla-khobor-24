import Link from "next/link";
import type { Article } from "@/types/news";
import { timeAgo } from "@/lib/format";

export default function Ticker({ headlines }: { headlines: Article[] }) {
    if (!headlines.length) return null;

    return (
        <div className="ticker border-b border-white/10 bg-ink text-paper">
            <div className="mx-auto flex max-w-7xl items-stretch">
                <div className="flex shrink-0 items-center gap-2 bg-brand-600 px-3.5 py-2 text-[11px] font-bold tracking-wide text-white sm:px-4 sm:text-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    সর্বশেষ
                </div>

                <div className="ticker-mask relative flex-1 overflow-hidden">
                    <div className="ticker-track flex w-max items-center py-2">
                        {[0, 1].map((copy) => (
                            <div
                                key={copy}
                                className="flex shrink-0 items-center"
                                aria-hidden={copy === 1}
                            >
                                {headlines.map((headline) => (
                                    <Link
                                        key={`${copy}-${headline.id}`}
                                        href={`/news/${headline.id}`}
                                        tabIndex={copy === 1 ? -1 : undefined}
                                        className="group inline-flex items-center text-xs font-medium text-paper/80 transition-colors hover:text-gold-200 sm:text-[13px]"
                                    >
                                        <span className="whitespace-nowrap">{headline.title}</span>
                                        <span className="mx-4 text-brand-400/70" aria-hidden>
                                            ◆
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden shrink-0 items-center border-l border-white/10 px-3 text-[11px] text-paper/40 lg:flex">
                    {timeAgo(headlines[0]?.publishedAt)}
                </div>
            </div>
        </div>
    );
}
