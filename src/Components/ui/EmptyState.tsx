import Link from "next/link";

export default function EmptyState({
    title,
    description,
    actionHref,
    actionLabel = "হোমপেজে যান",
}: {
    title: string;
    description?: string;
    actionHref?: string;
    actionLabel?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-surface/60 px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7h7.5a2.5 2.5 0 010 5H12m0 0H5.5A2.5 2.5 0 003 14.5v3A2.5 2.5 0 005.5 20H12m0-13V5.5A2.5 2.5 0 019.5 3H6a3 3 0 00-3 3v8.5"
                    />
                </svg>
            </div>
            <h2 className="mt-5 text-xl font-bold text-ink">{title}</h2>
            {description ? (
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>
            ) : null}
            {actionHref ? (
                <Link
                    href={actionHref}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}
