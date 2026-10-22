import Link from "next/link";

export default function SectionHeading({
    title,
    href,
    linkLabel = "সব দেখুন",
    description,
    className = "",
    id,
}: {
    title: string;
    href?: string;
    linkLabel?: string;
    description?: string;
    className?: string;
    id?: string;
}) {
    return (
        <div
            className={`mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4 ${className}`}
        >
            <div className="flex items-start gap-3">
                <span className="mt-1.5 h-7 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden />
                <div>
                    <h2 id={id} className="text-2xl font-bold text-ink sm:text-[1.7rem]">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-1 max-w-xl text-sm text-muted">{description}</p>
                    ) : null}
                </div>
            </div>

            {href ? (
                <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                    {linkLabel}
                    <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        aria-hidden
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            ) : null}
        </div>
    );
}
