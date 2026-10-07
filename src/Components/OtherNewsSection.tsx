'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface CategoryArticle {
    id: string | number;
    title: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    publishedAt?: string;
}

export interface OtherNewsSectionProps {
    title: string;
    articles: CategoryArticle[];
}
const OtherNewsSection = ({ title, articles }: OtherNewsSectionProps) => {
    return (
        <section className="w-full py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Title Header */}
                <div className="mb-8 flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-red-500 to-red-700" />
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* 3-Column Responsive News Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs hover:shadow-xl hover:border-red-200/80 hover:-translate-y-1 transition-all duration-300"
                        >
                            <Link href={`/news/${item.id}`} className="flex flex-col h-full">

                                {/* News Thumbnail */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                                    {item.imageUrl ? (
                                        <>
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </>
                                    ) : (
                                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                                            <svg className="h-8 w-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs font-medium">কোনো ছবি নেই</span>
                                        </div>
                                    )}
                                </div>

                                {/* News Details */}
                                <div className="mt-4 flex flex-1 flex-col justify-between space-y-3">
                                    <div className="space-y-2">
                                        {/* Category Badge */}
                                        <div>
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-600 tracking-wide uppercase border border-red-100/60">
                                                {item.category || title}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {/* Excerpt Description */}
                                        {item.description && (
                                            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Published Date */}
                                    {item.publishedAt && (
                                        <div className="pt-3 border-t border-slate-100/80 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                                            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{item.publishedAt}</span>
                                        </div>
                                    )}
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OtherNewsSection;
