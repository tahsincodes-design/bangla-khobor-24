'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.webp';

const Footer = () => {
    const [email, setEmail] = useState('');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('অনুগ্রহ করে একটি সঠিক ইমেইল অ্যাড্রেস দিন!');
            return;
        }

        toast.success('নিউজলেটারে সফলভাবে সাবস্ক্রাইব করা হয়েছে!');
        setEmail('');
    };

    return (
        <footer className="mt-12 bg-slate-900 text-slate-300 border-t-4 border-red-600">
            {/* Upper Main Footer Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Col 1 & 2: Branding & Info */}
                    <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
                                <div className="relative overflow-hidden rounded-xl bg-white p-1 shrink-0">
                                    <Image
                                        src={logo}
                                        alt="Bangla News 24 Logo"
                                        width={36}
                                        height={36}
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-2xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
                                    Bangla News <span className="text-red-600">24</span>
                                </span>
                            </Link>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-2">
                                সত্য ও বস্তুনিষ্ঠ সংবাদের নির্ভীক প্রকাশ। দেশ-বিদেশের সব খবর মুহূর্তেই পেতে আমাদের সাথেই থাকুন।
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                আমাদের ফলো করুন
                            </h4>
                            <div className="flex items-center gap-2.5">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                    aria-label="Facebook"
                                >
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                {/* YouTube */}
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                    aria-label="YouTube"
                                >
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                {/* X / Twitter */}
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                    aria-label="X"
                                >
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Col 3: Popular Categories */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-red-500 pl-2 mb-4">
                            বিভাগসমূহ
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/category/national" className="hover:text-red-400 transition-colors">
                                    জাতীয়
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/politics" className="hover:text-red-400 transition-colors">
                                    রাজনীতি
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/world" className="hover:text-red-400 transition-colors">
                                    আন্তর্জাতিক
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/economy" className="hover:text-red-400 transition-colors">
                                    অর্থনীতি
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/sports" className="hover:text-red-400 transition-colors">
                                    খেলা
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/technology" className="hover:text-red-400 transition-colors">
                                    প্রযুক্তি
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Corporate / Helpful Links */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-red-500 pl-2 mb-4">
                            তথ্য ও অন্যান্য
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/about" className="hover:text-red-400 transition-colors">
                                    আমাদের সম্পর্কে
                                </Link>
                            </li>
                            <li>
                                <Link href="/editorial" className="hover:text-red-400 transition-colors">
                                    সম্পাদকীয় টিম
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-red-400 transition-colors">
                                    যোগাযোগ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-red-400 transition-colors">
                                    গোপনীয়তা নীতি
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-red-400 transition-colors">
                                    ব্যবহারের শর্তাবলী
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 5: Newsletter Subscription */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-red-500 pl-2 mb-4">
                            নিউজলেটার
                        </h3>
                        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                            দৈনিক গুরুত্বপূর্ণ সংবাদের আপডেট পেতে আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন।
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="আপনার ইমেইল..."
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition-all active:scale-95 cursor-pointer"
                            >
                                সাবস্ক্রাইব করুন
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Lower Copyright Bar */}
            <div className="border-t border-slate-800 bg-slate-950 py-4 text-xs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
                    <p>© ২০২৬ বাংলা নিউজ ২৪। সর্বস্বত্ব সংরক্ষিত।</p>

                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline">সম্পাদক ও প্রকাশক: বাংলা নিউজ ২৪ টিম</span>
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3.5 py-1 text-xs text-slate-300 hover:bg-red-600 hover:text-white transition-all active:scale-95 cursor-pointer"
                            aria-label="Back to top"
                        >
                            <span>উপরে যান</span>
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;