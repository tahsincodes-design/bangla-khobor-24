'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.webp';

export default function Loading() {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-slate-50/60 px-4 py-12 relative overflow-hidden">

            {/* Ambient Background Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute top-1/3 left-1/3 -z-10 w-60 h-60 rounded-full bg-slate-200/50 blur-2xl pointer-events-none" />

            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 z-10">

                {/* Brand Logo with Pulsing Rings */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-24 w-24 rounded-2xl bg-red-600/15 animate-ping duration-1000" />
                    <div className="absolute h-20 w-20 rounded-2xl bg-red-600/20 animate-pulse" />

                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white p-3 shadow-xl shadow-red-600/10 border border-slate-100 flex items-center justify-center">
                        <Image
                            src={logo}
                            alt="Bangla News 24 Logo"
                            width={56}
                            height={56}
                            priority
                            className="object-contain animate-bounce"
                        />
                    </div>
                </div>

                {/* Brand Name & Loading Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-red-600">
                        Bangla News 24
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 animate-pulse">
                        সর্বশেষ খবর লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
                    </p>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-48 sm:w-64 h-1.5 bg-slate-200/80 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
                </div>

                {/* News Grid Skeleton Loader */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200/60 opacity-60">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs space-y-3 animate-pulse"
                        >
                            <div className="h-24 w-full bg-slate-200 rounded-xl" />
                            <div className="space-y-2">
                                <div className="h-3 bg-slate-200 rounded-md w-3/4" />
                                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}