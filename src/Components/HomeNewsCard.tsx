'use client';

import { Card, Link } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";

export interface MainNewsType {
    id: string;
    title: string;
    description?: string;
    link?: string;
    imageUrl?: string;
    image?: string;
    imageAlt?: string;
    category?: string;
    type?: string;
    isLive?: boolean;
    firstPublished?: string | null;
    lastPublished?: string | null;
    source?: string;
}

interface HomeNewsCardProps {
    mainNewsData?: MainNewsType[];
}

const HomeNewsCard = ({ mainNewsData = [] }: HomeNewsCardProps) => {
    const mainNews = mainNewsData[0];
    const secondaryNews = mainNewsData.slice(1, 5);
    const mostReadNews = mainNewsData.slice(5, 13);

    if (!mainNews) {
        notFound();
    };

    // Get image URL directly from your API
    const mainNewsImage = mainNews.imageUrl || mainNews.image;



    return (
        <section className="w-full bg-slate-50/50 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">

                    {/* COLUMN 1: Featured Main Big Image Card */}
                    {mainNews && (
                        <div className="col-span-12 lg:col-span-5">
                            <Card className="h-full border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl">
                                <Link href={`/news/${mainNews.id}`} className="group flex flex-col h-full">

                                    {/* News Image - Only renders if your API provides a valid image */}
                                    {mainNewsImage && (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                                            <Image
                                                src={mainNewsImage}
                                                alt={mainNews.imageAlt || mainNews.title || "সংবাদ চিত্র"}
                                                fill
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 40vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {mainNews.isLive && (
                                                <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                                                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                                    লাইভ
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* News Content */}
                                    <div className="mt-4 flex flex-1 flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-red-600 tracking-wide uppercase">
                                                {mainNews.category || "প্রধান খবর"}
                                            </span>
                                            <h2 className="mt-1 text-xl sm:text-2xl font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                                                {mainNews.title}
                                            </h2>
                                            {mainNews.description && (
                                                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                    {mainNews.description}
                                                </p>
                                            )}
                                        </div>

                                        {mainNews.firstPublished && (
                                            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                                                {mainNews.firstPublished}
                                            </div>
                                        )}
                                    </div>

                                </Link>
                            </Card>
                        </div>
                    )}

                    {/* COLUMN 2: Secondary Text-Only Stack */}
                    {secondaryNews.length > 0 && (
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <Card className="h-full border border-slate-200/80 bg-white p-5 shadow-sm rounded-2xl flex flex-col justify-between divide-y divide-slate-100">
                                {secondaryNews.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className={`${index === 0
                                            ? "pb-4"
                                            : index === secondaryNews.length - 1
                                                ? "pt-4"
                                                : "py-4"
                                            }`}
                                    >
                                        <Link href={`/news/${item.id}`} className="group block space-y-1">
                                            <span className="text-[11px] font-bold text-red-600 tracking-wide uppercase block">
                                                {item.category || "প্রধান খবর"}
                                            </span>
                                            <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors">
                                                {item.title}
                                            </h3>
                                        </Link>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    )}

                    {/* COLUMN 3: Most Read Sidebar */}
                    {mostReadNews.length > 0 && (
                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <Card className="h-full border border-slate-200/80 bg-white p-5 shadow-sm rounded-2xl">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                                    <span className="h-4 w-1 bg-red-600 rounded-full" />
                                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                                        সর্বাধিক পঠিত
                                    </h3>
                                </div>

                                <div className="space-y-3.5">
                                    {mostReadNews.map((item, index) => (
                                        <Link
                                            key={item.id || index}
                                            href={`/news/${item.id}`}
                                            className="group flex items-start gap-3 transition-all"
                                        >
                                            <span className="text-base sm:text-lg font-black text-slate-400 group-hover:text-red-600 leading-none shrink-0 w-4">
                                                {index + 1}
                                            </span>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                                {item.title}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default HomeNewsCard;