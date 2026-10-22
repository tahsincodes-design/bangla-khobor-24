"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 z-[60] h-0.5 bg-brand-600 transition-[width] duration-150"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            aria-hidden
        />
    );
}
