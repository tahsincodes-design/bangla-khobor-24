'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPages = () => {
    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-slate-50/60 px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 -z-10 w-64 h-64 rounded-full bg-slate-200/50 blur-2xl pointer-events-none" />

            <div className="w-full max-w-xl text-center space-y-8 rounded-3xl bg-white p-8 sm:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative z-10 backdrop-blur-sm">

                {/* 404 Stylized Badge */}
                <div className="relative inline-flex items-center justify-center">
                    <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700 tracking-tight select-none">
                        404
                    </span>
                    <div className="absolute -top-2 -right-3 sm:-top-3 sm:-right-4 bg-red-100 border border-red-200 text-red-600 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        Page Not Found
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                    <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        পৃষ্ঠাটি পাওয়া যায়নি!
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা লিংকটি সাময়িকভাবে অনুপলব্ধ।
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>হোমপেজে যান</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>পূর্ববর্তী পৃষ্ঠা</span>
                    </button>
                </div>

                {/* Quick Navigation Suggestions */}
                <div className="pt-6 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                        জনপ্রিয় বিভাগসমূহ
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                        <Link
                            href="/category/জাতীয়"
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            জাতীয়
                        </Link>
                        <Link
                            href="/category/রাজনীতি"
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            রাজনীতি
                        </Link>
                        <Link
                            href="/category/খেলাধুলা"
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            খেলাধুলা
                        </Link>
                        <Link
                            href="/category/বিনোদন"
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            বিনোদন
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotFoundPages;