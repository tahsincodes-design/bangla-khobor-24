

import React from 'react';
import logo from '@/assets/logo.webp'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';
import Marquee from './Marquee';
import UserInfo from './UserInfo';

const Topbar = () => {
    const date = new Date().toLocaleDateString('bn-BD', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header >
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="relative flex items-center justify-between py-2 sm:py-2.5">

                        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{date}</span>
                        </div>

                        <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center">
                            <Link
                                href="/"
                                className="group flex items-center gap-2.5 transition-transform active:scale-[0.98]"
                            >
                                <div className="relative shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={logo}
                                        alt="Bangla News 24 Logo"
                                        width={34}
                                        height={34}
                                        priority
                                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl sm:text-2xl font-black tracking-tight text-red-600 transition-colors group-hover:text-red-700 leading-tight">
                                        Bangla News 24
                                    </span>
                                    {/* Mobile Date subtext */}
                                    <span className="md:hidden text-[11px] font-medium text-slate-400 leading-none mt-0.5">
                                        {date}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <UserInfo/>

                    </div>

                    {/* Navbar Container */}
                    <div className="border-t border-slate-100 py-1">
                        {/* <Navbar /> */}
                    </div>
                    <Navbar />


                </div>
            </div>
            <Marquee />
        </header>

    );
};

export default Topbar;





