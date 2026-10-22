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
    if (!value || !value.startsWith("/") || value.startsWith("/signUp")) return "/profile";
    return value;
}

export default function SignUpForm() {
    const router = useRouter();
    const params = useSearchParams();
    const next = safeNext(params.get("next"));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (session?.user) router.replace(next);
    }, [session, router, next]);

    const passwordLongEnough = password.length >= 8;
    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (name.trim().length < 2) {
            setError("আপনার পূর্ণ নাম লিখুন।");
            return;
        }
        if (!passwordLongEnough) {
            setError("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
            return;
        }
        if (!passwordsMatch) {
            setError("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }
        if (!agreeTerms) {
            setError("শর্তাবলী ও গোপনীয়তা নীতি মেনে নিতে হবে।");
            return;
        }

        setLoading(true);

        try {
            const { error: authError } = await authClient.signUp.email({
                name: name.trim(),
                email,
                password,
                callbackURL: next,
            });

            if (authError) {
                setError(authErrorMessage(authError.message, "signUp"));
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে। স্বাগতম!");
            router.push(next);
            router.refresh();
        } catch {
            setError("একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const switchHref =
        next === "/profile" ? "/signIn" : `/signIn?next=${encodeURIComponent(next)}`;

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
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase"
                    >
                        পূর্ণ নাম
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className={inputClass}
                    />
                </div>

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
                    autoComplete="new-password"
                    hint="অন্তত ৮ অক্ষর ব্যবহার করুন।"
                />

                <PasswordField
                    id="confirm-password"
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    autoComplete="new-password"
                />

                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                    <span
                        className={
                            passwordLongEnough ? "text-emerald-700" : "text-muted"
                        }
                    >
                        {passwordLongEnough ? "✓" : "○"} ৮+ অক্ষর
                    </span>
                    <span className={passwordsMatch ? "text-emerald-700" : "text-muted"}>
                        {passwordsMatch ? "✓" : "○"} পাসওয়ার্ড মিলেছে
                    </span>
                </div>

                <div className="flex items-start gap-2 pt-1">
                    <input
                        id="agree-terms"
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(event) => setAgreeTerms(event.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-line accent-brand-600"
                    />
                    <label
                        htmlFor="agree-terms"
                        className="text-xs leading-relaxed font-medium text-ink-soft"
                    >
                        আমি{" "}
                        <Link href="/terms" className="font-semibold text-brand-700 hover:underline">
                            শর্তাবলী
                        </Link>{" "}
                        এবং{" "}
                        <Link
                            href="/privacy"
                            className="font-semibold text-brand-700 hover:underline"
                        >
                            গোপনীয়তা নীতি
                        </Link>{" "}
                        মেনে নিচ্ছি।
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            অ্যাকাউন্ট তৈরি হচ্ছে...
                        </>
                    ) : (
                        "অ্যাকাউন্ট খুলুন"
                    )}
                </button>
            </form>

            <p className="text-center text-xs text-muted">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link href={switchHref} className="font-bold text-brand-700 hover:underline">
                    সাইন ইন করুন
                </Link>
            </p>
        </div>
    );
}
