'use Client'

import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
    id: string;
    title: string;
}

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
    const data = await res.json();
    const headlines: Headlines[] = data.data;

    return (
        <div className="w-full sticky top-0 z-50 bg-slate-900 text-slate-100 border-y border-slate-800/80 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center px-4">
                {/* Modern Live Badge */}
                <div className="z-10 flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2 shrink-0 rounded-l shadow-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="whitespace-nowrap tracking-wide">সর্বশেষ</span>
                </div>

                {/* Marquee Content */}
                <div className="flex-1 overflow-hidden py-1.5 pl-3">
                    <MarqueeText className="py-0.5 text-xs sm:text-sm font-medium" direction="right" duration={10}>
                        {headlines.map((h) => (
                            <Link
                                key={h.id}
                                href={`/news/${h.id}`}
                                className="inline-flex items-center text-slate-200 transition-colors duration-200 hover:text-red-400"
                            >
                                <span>{h.title}</span>
                                <span className="mx-4 text-slate-500 font-normal">•</span>
                            </Link>
                        ))}
                    </MarqueeText>
                </div>
            </div>
        </div>
    );
};

export default Marquee;