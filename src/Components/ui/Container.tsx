import type { ReactNode } from "react";

export default function Container({
    children,
    className = "",
    size = "default",
}: {
    children: ReactNode;
    className?: string;
    size?: "default" | "narrow" | "wide";
}) {
    const width =
        size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[88rem]" : "max-w-7xl";

    return (
        <div className={`mx-auto w-full ${width} px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
