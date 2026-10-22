"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import PasswordField from "@/Components/ui/PasswordField";
import SocialButtons from "@/Components/ui/SocialButtons";

const inputClass =
    "w-full rounded-xl border border-line bg-paper/60 px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:bg-surface focus:ring-4 focus:ring-brand-600/10 focus:outline-none";

function safeNext(value: string | null): string {
    if (!value || !value.startsWith("/") || value.startsWith("/signIn")) return "/";
    return value;
}

export default function SignInForm() {
    const router = useRouter();
    const params = useSearchParams();
    const next = safeNext(params.get("next"));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (session?.user) router.replace(next);
    }, [session, router, next]);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
                rememberMe,
                callbackURL: next,
            });

            if (authError) {
                setError(authErrorMessage(authError.message, "signIn"));
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে");
            router.push(next);
            router.refresh();
        } catch {
            setError("একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {error ? (
                <div
                    role="alert"
                    aria-live="polite"
                    className="rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-sm font-medium text-brand-700"
                >
                    {error}
                </div>
            ) : null}

            <SocialButtons callbackURL={next} />

            <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-line" />
                <span className="absolute bg-surface px-3 text-xs font-medium text-muted">
                    অথবা ইমেইল দিয়ে
                </span>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase"
                    >
                        ইমেইল অ্যাড্রেস
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="example@gmail.com"
                        className={inputClass}
                    />
                </div>

                <PasswordField
                    id="password"
                    label="পাসওয়ার্ড"
                    value={password}
                    onChange={setPassword}
                    autoComplete="current-password"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink-soft">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) => setRememberMe(event.target.checked)}
                            className="h-4 w-4 rounded border-line accent-brand-600"
                        />
                        আমাকে মনে রাখুন
                    </label>
                    <Link
                        href="/contact"
                        className="text-xs font-semibold text-brand-700 hover:underline"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            সাইন ইন হচ্ছে...
                        </>
                    ) : (
                        "সাইন ইন"
                    )}
                </button>
            </form>
        </div>
    );
}
