"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

const providers: Array<{ id: Provider; label: string; icon: React.ReactNode }> = [
    {
        id: "google",
        label: "Google",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.32v3.15C3.3 21.32 7.37 24 12 24z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.32C.48 8.24 0 10.06 0 12s.48 3.76 1.32 5.44l4-3.15z"
                />
                <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.3 2.68 1.32 6.56l4 3.15c.94-2.82 3.58-4.96 6.68-4.96z"
                />
            </svg>
        ),
    },
    {
        id: "github",
        label: "GitHub",
        icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
];

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
    const [loading, setLoading] = useState<Provider | null>(null);

    const signIn = async (provider: Provider) => {
        setLoading(provider);
        try {
            await authClient.signIn.social({ provider, callbackURL });
        } catch {
            toast.error(`${provider === "google" ? "Google" : "GitHub"} সাইন ইন ব্যর্থ হয়েছে!`);
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            {providers.map((provider) => (
                <button
                    key={provider.id}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    disabled={loading !== null}
                    className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-line-strong hover:bg-paper/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading === provider.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-transparent" />
                    ) : (
                        provider.icon
                    )}
                    {provider.label}
                </button>
            ))}
        </div>
    );
}
