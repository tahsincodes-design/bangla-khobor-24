import Link from 'next/link';
import React from 'react';

interface Navs {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}

const Navbar = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const result = await res.json();

    const data: Navs[] = Array.isArray(result)
        ? result
        : result.categories || result.data || [];

    const filteredNavs = data.filter((n) => n.scrapable);

    return (
        <nav className="w-full overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 min-w-max mx-auto px-2">
                <Link
                    href="/"
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 whitespace-nowrap"
                >
                    হোম
                </Link>

                {data.length > 0 && (
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                )}

                {filteredNavs.map((j) => (
                    <Link
                        key={j.slug}
                        href={`/category/${j.slug}`}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-red-600 active:scale-95 whitespace-nowrap"
                    >
                        {j.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;