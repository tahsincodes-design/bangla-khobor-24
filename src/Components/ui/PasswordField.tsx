"use client";

import { useState } from "react";

export default function PasswordField({
    id,
    label,
    value,
    onChange,
    autoComplete = "current-password",
    placeholder = "••••••••",
    hint,
    required = true,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete?: "current-password" | "new-password";
    placeholder?: string;
    hint?: string;
    required?: boolean;
}) {
    const [visible, setVisible] = useState(false);
    const hintId = hint ? `${id}-hint` : undefined;

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    required={required}
                    aria-describedby={hintId}
                    className="w-full rounded-xl border border-line bg-paper/60 px-3.5 py-3 pr-12 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:bg-surface focus:ring-4 focus:ring-brand-600/10 focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                    aria-pressed={visible}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
                >
                    {visible ? (
                        <svg
                            className="h-4.5 w-4.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.5 10.5 0 0112 5c5 0 9 4.5 9 7a11.8 11.8 0 01-2.4 3.4M6.6 6.6C4.2 8.2 3 10.4 3 12c0 2.5 4 7 9 7 1.2 0 2.3-.3 3.3-.7"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4.5 w-4.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
                            />
                            <circle cx="12" cy="12" r="2.7" />
                        </svg>
                    )}
                </button>
            </div>
            {hint ? (
                <p id={hintId} className="mt-1.5 text-xs text-muted">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}
