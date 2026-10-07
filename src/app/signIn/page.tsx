'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import logo from '@/assets/logo.webp';
import { createAuthClient } from "better-auth/client";


export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: '/',
                rememberMe,
            });

            if (error) {
                toast.error(error.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
            } else if (data) {
                toast.success('সফলভাবে সাইন ইন হয়েছে!');
            }
        } catch (error) {
            console.error('Sign in failed:', error);
            toast.error('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInGoogle = async () => {

        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
            });
        } catch {
            toast.error('Google সাইন ইন ব্যর্থ হয়েছে!');
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/',
            });
        } catch {
            toast.error('GitHub সাইন ইন ব্যর্থ হয়েছে!');
        }
    };


    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50/60 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100/80 transition-all">
                <div className="flex flex-col items-center text-center">
                    <Link href="/" className="group flex items-center gap-2.5 mb-3 transition-transform active:scale-95">
                        <div className="relative overflow-hidden rounded-xl bg-white p-1">
                            <Image
                                src={logo}
                                alt="Bangla News 24 Logo"
                                width={42}
                                height={42}
                                priority
                                className="object-contain transition-transform group-hover:scale-105"
                            />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-red-600">
                            Bangla News 24
                        </span>
                    </Link>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        অ্যাকাউন্টে সাইন ইন করুন
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                        সর্বশেষ সংবাদের সঙ্গে যুক্ত থাকতে আপনার ইমেইল ও পাসওয়ার্ড দিন
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button onClick={handleSignInGoogle}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                        Google
                    </button>

                    <button
                    onClick={handleGithubSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
                    >
                        <svg className="h-4 w-4 fill-slate-900" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-slate-200/80" />
                    <span className="absolute bg-white px-3 text-xs font-medium text-slate-400">
                        অথবা ইমেইল দিয়ে
                    </span>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                            ইমেইল অ্যাড্রেস
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                                পাসওয়ার্ড
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.02 10.02 0 013.682-.782c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.742 1.3A9.971 9.971 0 0112 19c-1.32 0-2.57-.254-3.715-.714M9.88 9.88a3 3 0 104.24 4.24" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center pt-1">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded-md border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-slate-600 cursor-pointer">
                            মনে রাখুন
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-red-600 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                <span>সাইন ইন হচ্ছে...</span>
                            </>
                        ) : (
                            <span>সাইন ইন</span>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs font-medium text-slate-500">
                    নতুন ব্যবহারকারী?{' '}
                    <Link
                        href="/signUp"
                        className="font-bold text-red-600 hover:text-red-700 hover:underline transition-colors"
                    >
                        এখানে সাইন আপ করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}