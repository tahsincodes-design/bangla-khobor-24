'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export interface BodyBlock {
    type: 'text' | 'image' | 'subheading';
    text?: string;
    url?: string;
    caption?: string | null;
    altText?: string;
    copyrightHolder?: string;
    width?: number;
    height?: number;
}

export interface Byline {
    name: string;
    role: string;
}

export interface Topic {
    id: string;
    name: string;
}

export interface DetailNewsData {
    id: string;
    title: string;
    firstPublished: string;
    lastPublished?: string;
    byline?: Byline[];
    topics?: Topic[];
    tags?: string[];
    imageUrl?: string;
    body?: BodyBlock[];
    source?: string;
    sourceUrl?: string;
    wordCount?: number;
}

interface DetailNewsCardProps {
    detailNews: DetailNewsData;
}

const DetailNewsCard: React.FC<DetailNewsCardProps> = ({ detailNews }) => {
    const [copied, setCopied] = useState(false);

    // Format Date in Bangla
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if(!detailNews){
        notFound();
    }

    // Copy Article URL
    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <article className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10 bg-white rounded-2xl shadow-xs border border-slate-100">

            {/* 1. Topics Header */}
            {detailNews.topics && detailNews.topics.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {detailNews.topics.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/api/article/${topic.id}`}
                            className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                        >
                            {topic.name}
                        </Link>
                    ))}
                </div>
            )}

            {/* 2. Article Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-snug sm:leading-tight tracking-tight mb-6">
                {detailNews.title}
            </h1>

            {/* 3. Byline & Metadata Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-slate-200 py-4 my-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm shadow-xs shrink-0">
                        {detailNews.byline?.[0]?.name ? detailNews.byline[0].name.charAt(0) : 'খ'}
                    </div>
                    <div>
                        {detailNews.byline && detailNews.byline.length > 0 ? (
                            detailNews.byline.map((b, i) => (
                                <div key={i} className="text-sm font-bold text-slate-800">
                                    {b.name} <span className="font-normal text-xs text-slate-500">({b.role})</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm font-bold text-slate-800">
                                {detailNews.source || 'বাংলা নিউজ ২৪'}
                            </div>
                        )}
                        <div className="text-xs font-medium text-slate-500 mt-0.5">
                            প্রকাশিত: {formatDate(detailNews.firstPublished)}
                        </div>
                    </div>
                </div>

                {/* Share Button */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
                        title="লিঙ্ক কপি করুন"
                    >
                        <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{copied ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
                    </button>
                </div>
            </div>

            {/* 4. Article Body Content */}
            <div className="mt-8 space-y-6 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                {detailNews.body && detailNews.body.length > 0 ? (
                    detailNews.body.map((block, index) => {

                        // Subheading
                        if (block.type === 'subheading' && block.text) {
                            return (
                                <h2
                                    key={index}
                                    className="text-xl sm:text-2xl font-extrabold text-slate-900 border-l-4 border-red-600 pl-3 py-1 mt-8 mb-4 tracking-tight"
                                >
                                    {block.text}
                                </h2>
                            );
                        }

                        // Image
                        if (block.type === 'image' && block.url) {
                            return (
                                <figure key={index} className="my-8 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 shadow-xs">
                                    <div className="relative aspect-video w-full">
                                        <Image
                                            src={block.url}
                                            alt={block.altText || block.caption || detailNews.title}
                                            fill
                                            sizes="(max-width: 896px) 100vw, 896px"
                                            className="object-cover"
                                        />
                                    </div>
                                    {(block.caption || block.copyrightHolder) && (
                                        <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            {block.caption && <span>{block.caption}</span>}
                                            {block.copyrightHolder && (
                                                <span className="shrink-0 text-slate-400 font-medium">
                                                    © {block.copyrightHolder}
                                                </span>
                                            )}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        }

                        // Text Paragraph
                        if (block.type === 'text' && block.text) {
                            return (
                                <p key={index} className="mb-4 text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line">
                                    {block.text}
                                </p>
                            );
                        }

                        return null;
                    })
                ) : (
                    <p className="text-slate-600">এই সংবাদে বিস্তারিত বিবরণ নেই।</p>
                )}
            </div>

            {/* 5. Article Tags */}
            {detailNews.tags && detailNews.tags.length > 0 && (
                <div className="mt-10 border-t border-slate-200 pt-6">
                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        সম্পর্কিত ট্যাগসমূহ
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {detailNews.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* 6. Source Attribution */}
            {detailNews.source && (
                <div className="mt-6 text-sm text-slate-500 text-right">
                    সূত্র:{' '}
                    {detailNews.sourceUrl ? (
                        <a
                            href={detailNews.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-red-600 hover:underline font-semibold"
                        >
                            {detailNews.source}
                        </a>
                    ) : (
                        <span className="font-semibold">{detailNews.source}</span>
                    )}
                </div>
            )}
        </article>
    );
};

export default DetailNewsCard;