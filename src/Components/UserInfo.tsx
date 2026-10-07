'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('সাইন আউট সফল হয়েছে!');
                        router.push('/');
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message || 'সাইন আউট ব্যর্থ হয়েছে!');
                    },
                },
            });
        } catch {
            toast.error('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।');
        }
    };

    // Smooth loading skeleton while checking session status
    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                <div className="hidden sm:block h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
        );
    }

    return (
        <div className="flex items-center">
            {user ? (
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-full py-1 pl-1.5 pr-2.5 shadow-2xs hover:border-slate-300 transition-all">

                    {/* User Avatar */}
                    <Link href={'/profile'}><div className="relative shrink-0">
                        {user.image ? (
                            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-red-200">
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-xs font-bold text-white shadow-xs">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div></Link>

                    {/* User Name */}
                    <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[110px] truncate">
                        {user.name || 'ব্যবহারকারী'}
                    </span>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 cursor-pointer"
                        title="সাইন আউট"
                    >
                        সাইন আউট
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Link
                        href="/signIn"
                        className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-all"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/signUp"
                        className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 hover:shadow-md transition-all active:scale-95"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;