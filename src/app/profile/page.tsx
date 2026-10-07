'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Active tab state
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'account'>('profile');

    // Profile form state
    const [name, setName] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Password change form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Handle Profile Update
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const profileName = (name ?? user?.name ?? '').trim();
        const profileImage = image ?? user?.image ?? '';
        if (!profileName) {
            toast.error('নাম ফাঁকা রাখা যাবে না!');
            return;
        }

        setIsSavingProfile(true);
        try {
            const res = await authClient.updateUser({
                name: profileName,
                image: profileImage.trim() || undefined,
            });

            if (res?.error) {
                toast.error(res.error.message || 'প্রোফাইল আপডেট করা যায়নি!');
            } else {
                toast.success('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
            }
        } catch {
            toast.error('একটি সমস্যা ঘটেছে। আবার চেষ্টা করুন।');
        } finally {
            setIsSavingProfile(false);
        }
    };

    // Handle Password Change
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            toast.error('বর্তমান পাসওয়ার্ড দিন!');
            return;
        }

        if (newPassword.length < 8) {
            toast.error('নতুন পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে!');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error('নতুন পাসওয়ার্ড মিলছে না!');
            return;
        }

        setIsChangingPassword(true);
        try {
            const res = await authClient.changePassword({
                newPassword,
                currentPassword,
                revokeOtherSessions: true,
            });

            if (res?.error) {
                toast.error(res.error.message || 'পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি!');
            } else {
                toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        } catch {
            toast.error('একটি সমস্যা ঘটেছে। আবার চেষ্টা করুন।');
        } finally {
            setIsChangingPassword(false);
        }
    };

    // Handle Sign Out
    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('সাইন আউট সফল হয়েছে!');
                        router.push('/signIn');
                    },
                },
            });
        } catch {
            toast.error('সাইন আউট করতে সমস্যা হয়েছে!');
        }
    };

    // Loading Skeleton state
    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
                    <div className="h-44 bg-slate-200 rounded-3xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="h-64 bg-slate-200 rounded-3xl" />
                        <div className="lg:col-span-2 h-96 bg-slate-200 rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Unauthenticated View
    if (!user) {
        return (
            <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-slate-50/60 px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-slate-200/50 border border-slate-100 space-y-5">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
                        !
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-900">সাইন ইন প্রয়োজন</h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            প্রোফাইল দেখতে বা পরিবর্তন করতে অনুগ্রহ করে অ্যাকাউন্টে সাইন ইন করুন।
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <Link
                            href="/signIn"
                            className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
                        >
                            সাইন ইন করুন
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Cover & Profile Overview Banner Card */}
                <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="h-32 sm:h-40 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                    </div>

                    <div className="relative px-6 pb-6 pt-0 sm:px-8 flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14 sm:-mt-16">
                        {/* Avatar Image */}
                        <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl border-4 border-white bg-slate-100 shadow-lg overflow-hidden shrink-0">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'User Profile'}
                                    fill
                                    
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-4xl font-extrabold">
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>

                        {/* Profile Header Details */}
                        <div className="flex-1 text-center sm:text-left space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                    {user.name || 'ব্যবহারকারী'}
                                </h1>
                                <span className="self-center sm:self-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                                    সক্রিয় পাঠক
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                {user.email}
                            </p>
                        </div>

                        {/* Sign Out Button */}
                        <div className="mt-2 sm:mt-0">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 shadow-2xs cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                সাইন আউট
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${activeTab === 'profile'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                প্রোফাইল তথ্য
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${activeTab === 'security'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                পাসওয়ার্ড ও নিরাপত্তা
                            </button>

                            <button
                                onClick={() => setActiveTab('account')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${activeTab === 'account'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                অ্যাকাউন্ট বিবরণ
                            </button>
                        </div>
                    </div>

                    {/* Tab Panels */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/50">

                            {/* TAB 1: Profile Settings */}
                            {activeTab === 'profile' && (
                                <form onSubmit={handleUpdateProfile} className="space-y-5">
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900">প্রোফাইল পরিবর্তন করুন</h3>
                                        <p className="text-slate-500 text-xs">আপনার নাম এবং প্রদর্শনী ছবি আপডেট করুন</p>
                                    </div>

                                    <div>
                                        <label htmlFor="profile-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                                            পূর্ণ নাম
                                        </label>
                                        <input
                                            id="profile-name"
                                            type="text"
                                            required
                                            value={name ?? user.name ?? ''}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="আপনার নাম লিখুন"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="profile-image" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                                            প্রোফাইল ছবি URL
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                id="profile-image"
                                                type="url"
                                                value={image ?? user.image ?? ''}
                                                onChange={(e) => setImage(e.target.value)}
                                                placeholder="https://example.com/photo.jpg"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                            />
                                            {(image ?? user.image) && (
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                                    <Image
                                                        src={image ?? user.image ?? ''}
                                                        alt="Preview"
                                                        unoptimized
                                                        fill
                                                        className="object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSavingProfile}
                                        className="rounded-xl bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer flex items-center gap-2"
                                    >
                                        {isSavingProfile ? (
                                            <>
                                                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                <span>সংরক্ষণ হচ্ছে...</span>
                                            </>
                                        ) : (
                                            <span>পরিবর্তন সংরক্ষণ করুন</span>
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* TAB 2: Security & Password */}
                            {activeTab === 'security' && (
                                <form onSubmit={handleChangePassword} className="space-y-5">
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900">পাসওয়ার্ড পরিবর্তন করুন</h3>
                                        <p className="text-slate-500 text-xs">আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে নতুন পাসওয়ার্ড দিন</p>
                                    </div>

                                    <div>
                                        <label htmlFor="current-pass" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                                            বর্তমান পাসওয়ার্ড
                                        </label>
                                        <input
                                            id="current-pass"
                                            type="password"
                                            required
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="new-pass" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                                            নতুন পাসওয়ার্ড
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="new-pass"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
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

                                    <div>
                                        <label htmlFor="confirm-new-pass" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                                            নতুন পাসওয়ার্ড নিশ্চিত করুন
                                        </label>
                                        <input
                                            id="confirm-new-pass"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isChangingPassword}
                                        className="rounded-xl bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer flex items-center gap-2"
                                    >
                                        {isChangingPassword ? (
                                            <>
                                                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                <span>আপডেট হচ্ছে...</span>
                                            </>
                                        ) : (
                                            <span>পাসওয়ার্ড আপডেট করুন</span>
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* TAB 3: Account Details */}
                            {activeTab === 'account' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900">অ্যাকাউন্ট বিবরণ</h3>
                                        <p className="text-slate-500 text-xs">আপনার নিবন্ধিত অ্যাকাউন্ট তথ্যের সারসংক্ষেপ</p>
                                    </div>

                                    <div className="space-y-4 divide-y divide-slate-100">
                                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ইমেইল অ্যাড্রেস</span>
                                            <span className="text-sm font-semibold text-slate-900">{user.email}</span>
                                        </div>

                                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ইমেইল স্ট্যাটাস</span>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                যাচাইকৃত (Active)
                                            </span>
                                        </div>

                                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">অ্যাকাউন্ট আইডি</span>
                                            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                                                {user.id}
                                            </span>
                                        </div>

                                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">যোগদানের তারিখ</span>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'অজানা'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}