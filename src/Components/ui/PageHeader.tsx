import type { ReactNode } from "react";

export default function PageHeader({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    children?: ReactNode;
}) {
    return (
        <header className="border-b border-line pb-8">
            {eyebrow ? (
                <p className="mb-2 text-xs font-bold tracking-[0.18em] text-brand-600 uppercase">
                    {eyebrow}
                </p>
            ) : null}
            <h1 className="text-3xl leading-tight font-bold text-ink sm:text-4xl">{title}</h1>
            {description ? (
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p>
            ) : null}
            {children}
        </header>
    );
}
