
import { News } from "@/app/category/[id]/page";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const IndivisualCategoryCard = ({ news }: { news: News }) => {
    if (!news) {
        notFound();
    };

    return (
        <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-2xl hover:shadow-red-500/10">
            <Link href={`/news/${news.id}`} className="flex h-full flex-col">

                {/* Image Container with Glassmorphism Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                    {news.imageUrl ? (
                        <>
                            <Image
                                src={news.imageUrl}
                                alt={news.imageAlt || news.title || "সংবাদ চিত্র"}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-slate-100 text-slate-400">
                            <svg className="h-7 w-7 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[11px] font-medium">কোনো ছবি নেই</span>
                        </div>
                    )}

                    {/* Floating Category Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs border border-white/20">
                            {news.category || "খবর"}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-3.5 flex flex-1 flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                        {/* Headline */}
                        <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-red-600 line-clamp-2">
                            {news.title}
                        </h3>

                        {/* Excerpt */}
                        {news.description && (
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-500 line-clamp-2">
                                {news.description}
                            </p>
                        )}
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{news.cachedAt || "আজকে"}</span>
                        </div>

                        {/* Read Arrow Indicator */}
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
                            পড়ুন
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>

            </Link>
        </div>
    );
};

export default IndivisualCategoryCard;