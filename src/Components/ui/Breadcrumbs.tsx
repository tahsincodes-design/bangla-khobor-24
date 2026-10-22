import Link from "next/link";

export default function Breadcrumbs({
    items,
}: {
    items: Array<{ label: string; href?: string }>;
}) {
    return (
        <nav aria-label="ব্রেডক্রাম্ব" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
                <li>
                    <Link href="/" className="transition-colors hover:text-brand-700">
                        হোম
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                        <span className="text-line-strong" aria-hidden>
                            /
                        </span>
                        {item.href ? (
                            <Link href={item.href} className="transition-colors hover:text-brand-700">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="line-clamp-1 max-w-[22rem] text-ink-soft" aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
